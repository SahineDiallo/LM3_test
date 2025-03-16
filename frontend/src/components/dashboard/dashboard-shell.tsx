import type React from "react"
import { MainNav } from "../main-nav"
import { UserNav } from "../user-nav"


interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-b-gray-300 bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between py-4 px-4 md:px-6">
          <MainNav />
          <UserNav />
        </div>
      </header>
      <main className="flex-1 container mx-auto py-6 px-4 md:px-6">{children}</main>
    </div>
  )
}

