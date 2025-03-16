"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Download, Printer } from "lucide-react"

interface TransactionDetailsDialogProps {
  children: React.ReactNode
  transaction: {
    id: string
    type: string
    method: { type: string; last4: string }
    name: string
    date: string
    status: string
    amount: string
  }
}

export function TransactionDetailsDialog({ children, transaction }: TransactionDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Détails de la transaction</DialogTitle>
          <DialogDescription>Informations complètes sur la transaction #{transaction.id}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">ID de transaction</h3>
              <p className="font-medium">{transaction.id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Date</h3>
              <p className="font-medium">{transaction.date}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Statut</h3>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                <p className="font-medium">{transaction.status}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Montant</h3>
              <p className="font-medium">{transaction.amount}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Informations client</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="py-2 pl-0 font-medium">Nom</TableCell>
                  <TableCell className="py-2">{transaction.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="py-2 pl-0 font-medium">Email</TableCell>
                  <TableCell className="py-2">client@example.com</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="py-2 pl-0 font-medium">Téléphone</TableCell>
                  <TableCell className="py-2">+33 6 12 34 56 78</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Détails du paiement</h3>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="py-2 pl-0 font-medium">Méthode</TableCell>
                  <TableCell className="py-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`font-mono text-xs ${transaction.method.type === "VISA" ? "text-blue-600" : "text-green-600"}`}
                      >
                        {transaction.method.type}
                      </div>
                      <div className="text-muted-foreground text-xs">••• {transaction.method.last4}</div>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="py-2 pl-0 font-medium">Type</TableCell>
                  <TableCell className="py-2">{transaction.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="py-2 pl-0 font-medium">Devise</TableCell>
                  <TableCell className="py-2">EUR</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row justify-between sm:justify-between gap-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-none">
              <Printer className="h-4 w-4 mr-2" />
              Imprimer
            </Button>
            <Button variant="outline" size="sm" className="rounded-none">
              <Download className="h-4 w-4 mr-2" />
              Télécharger
            </Button>
          </div>
          <Button type="submit" className="bg-[#1F0779] hover:bg-[#1F0779]/90 rounded-none">
            Fermer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

