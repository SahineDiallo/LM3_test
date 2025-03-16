"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthStore } from "@/store/auth-store";
import { UserSearch } from "@/components/dashboard/user-search";
import { useOptionsStore } from "@/store/form-options-store";

// Define the form schema
const formSchema = z.object({
  amount: z.string().min(1, {
    message: "Veuillez entrer un montant.",
  }),
  currency: z.string({
    required_error: "Veuillez sélectionner une devise.",
  }),
  method: z.string({
    required_error: "Veuillez sélectionner une méthode de paiement.",
  }),
  categorie: z.string({
    required_error: "Veuillez sélectionner un type de transaction.",
  }),
  description: z.string().optional(),
  user_id: z.string().optional(), 
});

interface AddTransactionDialogProps {
  children: React.ReactNode;
  is_admin: boolean;
}

export function AddTransactionDialog({ children, is_admin }: AddTransactionDialogProps) {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { currencies, categories, fetchCurrencies, fetchCategories } = useOptionsStore();

  useEffect(() => {
    fetchCurrencies();
    fetchCategories();
  }, [fetchCurrencies, fetchCategories]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      currency: "",
      method: "",
      categorie: "",
      description: "",
      user_id: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const payload = {
        amount: parseFloat(values.amount),
        currency: values.currency,
        description: values.description,
        categorie: values.categorie, 
        method: values.method,
        // user_id: is_admin ? values.user_id : user?.id,
      };

      const createUrl = is_admin
        ? `${import.meta.env.VITE_API_BASE_URL}/api/users/${values.user_id}/transactions/create_user_transaction/`
        : ``;

      // Send the data to the backend
      const response = await fetch(`${createUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create transaction");
      }

      // Close the dialog and reset the form
      setOpen(false);
      form.reset();
      location.reload(); // just reload the browser apres on va render the data sans reload(a revoir)
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nouvelle transaction</DialogTitle>
          <DialogDescription>Créez une nouvelle transaction pour un client.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {is_admin && (
              <FormField
                control={form.control}
                name="user_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Utilisateur</FormLabel>
                    <FormControl>
                      <UserSearch onSelect={(userId) => field.onChange(userId)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Montant</FormLabel>
                  <FormControl>
                    <Input placeholder="0.00" {...field} className="rounded-none h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Devise</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-none h-12">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Méthode de paiement</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-none h-12">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="VISA">VISA</SelectItem>
                      <SelectItem value="WAVE">WAVE</SelectItem>
                      <SelectItem value="ORANGE_MONEY">Orange Money</SelectItem>
                      <SelectItem value="MASTER_CARD">Master Card</SelectItem>
                      <SelectItem value="MOBILE_MONEY">Mobile Money</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categorie"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de transaction</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-none h-12">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.name} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description de la transaction" {...field} className="rounded-none h-12" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="bg-[#1F0779] hover:bg-[#1F0779]/90 rounded-none h-12">
                Créer la transaction
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}