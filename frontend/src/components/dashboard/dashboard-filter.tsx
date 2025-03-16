"use client"

// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useState } from "react"

export function TransactionFilters() {
  // const [dateRange, setDateRange] = useState("3-mois")
  // const [transactionType, setTransactionType] = useState("tous")
  // const [status, setStatus] = useState("tous")
  // const [paymentGateway, setPaymentGateway] = useState("tous")
  // const [currency, setCurrency] = useState("tous")

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-medium">Filtres</CardTitle>
        <CardDescription>Affinez votre liste de transactions</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-5">
        {/* <div className="space-y-2">
          <h3 className="text-sm font-medium">Période</h3>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="rounded-none border-gray-300">
              <SelectValue placeholder="Sélectionner une période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7-jours">7 derniers jours</SelectItem>
              <SelectItem value="1-mois">Dernier mois</SelectItem>
              <SelectItem value="3-mois">3 derniers mois</SelectItem>
              <SelectItem value="6-mois">6 derniers mois</SelectItem>
              <SelectItem value="1-an">Dernière année</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-normal">Type de transaction</h3>
          <div className="grid gap-2">
            <Button
              variant={transactionType === "tous" ? "default" : "outline"}
              size="lg"
              className={`justify-between rounded-none ${transactionType !== 'tous' ? "text-gray-700": "text-white"}`}
              onClick={() => setTransactionType("tous")}
            >
              Tous
              <span className="ml-auto text-xs font-normal">309</span>
            </Button>
            <Button
              variant={transactionType === "paiements" ? "default" : "outline"}
              size="lg"
              className={`justify-between rounded-none ${transactionType !== 'paiements' ? "text-gray-700": "text-white"}`}
              onClick={() => setTransactionType("paiements")}
            >
              Paiements
              <span className="ml-auto text-xs font-normal">306</span>
            </Button>
            <Button
              variant={transactionType === "remboursements" ? "default" : "outline"}
              size="lg"
              className={`justify-between rounded-none ${transactionType !== 'remboursements' ? "text-gray-700": "text-white"}`}
              onClick={() => setTransactionType("remboursements")}
            >
              Remboursements
              <span className="ml-auto text-xs font-normal">1</span>
            </Button>
            <Button
              variant={transactionType === "verifications" ? "default" : "outline"}
              size="lg"
              className={`justify-between rounded-none ${transactionType !== 'verifications' ? "text-gray-700": "text-white"}`}
              onClick={() => setTransactionType("verifications")}
            >
              Vérifications
              <span className="ml-auto text-xs font-normal">2</span>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-normal">Statut</h3>
          <div className="grid gap-2">
            <Button
              variant={status === "tous" ? "default" : "outline"}
              size="lg"
              className={`justify-between rounded-none ${status !== 'tous' ? "text-gray-700": "text-white"}`}
              onClick={() => setStatus("tous")}
            >
              Tous
              <span className="ml-auto text-xs font-normal">309</span>
            </Button>
            <Button
              variant={status === "reussi" ? "default" : "outline"}
              size="lg"
              className={`justify-between rounded-none ${status !== 'reussi' ? "text-gray-700": "text-white"}`}
              onClick={() => setStatus("reussi")}
            >
              Réussi
              <span className="ml-auto text-xs font-normal">309</span>
            </Button>
            <Button
              variant={status === "refuse" ? "default" : "outline"}
              size="lg"
              className={`justify-between rounded-none ${status !== 'refuse' ? "text-gray-700": "text-white"}`}
              onClick={() => setStatus("refuse")}
            >
              Refusé
              <span className="ml-auto text-xs font-normal">0</span>
            </Button>
            <Button
              variant={status === "annule" ? "default" : "outline"}
              size="lg"
              className={`justify-between rounded-none ${status !== 'annule' ? "text-gray-700": "text-white"}`}
              onClick={() => setStatus("annule")}
            >
              Annulé
              <span className="ml-auto text-xs font-normal">0</span>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-normal">Passerelle de paiement</h3>
          <Select value={paymentGateway} onValueChange={setPaymentGateway}>
            <SelectTrigger className="rounded-none">
              <SelectValue placeholder="Sélectionner une passerelle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous (309)</SelectItem>
              <SelectItem value="visa">Visa</SelectItem>
              <SelectItem value="mastercard">Mastercard</SelectItem>
              <SelectItem value="amex">American Express</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Devise</h3>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="rounded-none">
              <SelectValue placeholder="Sélectionner une devise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous (309)</SelectItem>
              <SelectItem value="usd">USD</SelectItem>
              <SelectItem value="eur">EUR</SelectItem>
              <SelectItem value="gbp">GBP</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </CardContent>
    </Card>
  )
}

