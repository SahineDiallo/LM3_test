"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowDown, ArrowUp, HelpCircle, Search } from "lucide-react"
import { TransactionDetailsDialog } from "@/components/dashboard/transaction-details-dialog"
import { useAuthStore } from "@/store/auth-store"
import { format } from "date-fns";
import { fr } from "date-fns/locale"; 




const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy, HH:mm:ss", { locale: fr });
};


interface Currency {
  id: string;
  code: string; 
  name: string;
}

interface Categorie {
  id: string;
  name: string;
  type: string; 
}


interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  mobile_phone: string;
  is_admin: boolean;
}

interface Transaction {
  id: string;
  method: string; 
  method_color: string;
  user: User;
  date: string; 
  status: string; 
  amount: number; 
  currency: Currency;
  description: string; 
  categorie: Categorie;
}

export function TransactionsTable() {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchQuery, setSearchQuery] = useState("")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const user = useAuthStore((state) => state.user)
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${baseUrl}/api/users/${user?.id}/transactions/list_user_transactions/?page=${page}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        })

        if (!response.ok) {
          throw new Error("Failed to fetch transactions")
        }

        const data = await response.json();
        console.log("transaction data", data)
        setTransactions(data)
        setTotalPages(data.total_pages)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message) 
        } else {
          setError("An unknown error occurred")
        }
      } finally {
        setLoading(false)
      }
    }
    if (user?.id && user?.token && page) {
      fetchTransactions()
    }
  }, [page, baseUrl, user?.id, user?.token])

  if (loading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return null
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />
  }


  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-medium">Transactions</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher des transactions..."
                className="w-full sm:w-[250px] pl-8 rounded-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-none text-white">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>Gérez et suivez toutes vos transactions récentes.</CardDescription>
      </CardHeader>
      <CardContent className="px-0 sm:px-6 overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead>Méthode</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center">Nom {getSortIcon("name")}</div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                <div className="flex items-center">Date {getSortIcon("date")}</div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                <div className="flex items-center">Statut {getSortIcon("status")}</div>
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("amount")}>
                <div className="flex items-center justify-end">Montant {getSortIcon("amount")}</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Aucune transaction trouvée
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TransactionDetailsDialog key={transaction.id} transaction={transaction}>
                  <TableRow className="cursor-pointer hover:bg-muted/50">
                    <TableCell>{transaction.categorie.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`font-mono text-xs ${transaction.method === "VISA" ? "text-blue-600" : "text-green-600"}`}
                        >
                          {transaction.method}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.user.first_name}</TableCell>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                        {transaction.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">{transaction.amount}</TableCell>
                  </TableRow>
                </TransactionDetailsDialog>
              ))
              
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between border-t px-4 sm:px-6 py-4 gap-4">
        <div className="text-xs text-muted-foreground">
          Affichage de transactions sur {transactions.length}
        </div>
        <div>
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
            Prev
          </button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => setPage((prev) => prev + 1)} disabled={page === totalPages}>
            Suiv
          </button>
      </div>
      </CardFooter>
    </Card>
  )
}

