import { TransactionFilters } from "@/components/dashboard/dashboard-filter"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { TransactionsTable } from "@/components/dashboard/dashboard-table"


export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Transactions" description="Gérez et suivez toutes vos transactions financières." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-1 order-2 lg:order-1">
          <TransactionFilters />
        </div>
        <div className="lg:col-span-3 order-1 lg:order-2">
          <TransactionsTable />
        </div>
      </div>
    </DashboardShell>
  )
}

