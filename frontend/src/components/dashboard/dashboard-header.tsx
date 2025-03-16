import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AddTransactionDialog } from "@/components/dashboard/add-transaction-dialog"
import { useAuthStore } from "@/store/auth-store"

interface DashboardHeaderProps {
  heading: string
  description?: string
}

export function DashboardHeader({ heading, description }: DashboardHeaderProps) {
  const { user } = useAuthStore();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      { user && (
        <AddTransactionDialog is_admin={user.is_admin}>
          <Button className="bg-[#1F0779] hover:bg-[#1F0779]/90 text-white text-lg font-normal rounded-none w-full sm:w-auto" size="lg" style={{ letterSpacing: 0.5 }}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nouvelle transaction
          </Button>
        </AddTransactionDialog>
      )}
    </div>
  )
}

