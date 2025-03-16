"use client"
import { useAuthStore } from "@/store/auth-store"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { useLocation } from "react-router-dom"

export function MainNav() {
  const location = useLocation()
  const user = useAuthStore((state) => state.user)
  const isAdmin = user?.is_admin || false

  return (
    <div className="flex gap-6 md:gap-10 items-center z-50 bg-white">
      <a href="/tableau-de-bord" className="flex items-center space-x-2">
        <span className="inline-block font-bold">
          <span className="text-[#1F0779] text-2xl font-medium">Trans</span>
          <span className="text-orange-500 text-2xl font-medium">action</span>
        </span>
      </a>
      <nav className="hidden md:flex gap-6">
        <a
          href="/tableau-de-bord"
          className={cn(
            "text-lg font-medium transition-colors hover:text-primary",
            location.pathname === "/tableau-de-bord" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Tableau de bord
        </a>
        <a
          href="/tableau-de-bord/transactions"
          className={cn(
            "text-lg font-medium transition-colors hover:text-primary",
            location.pathname === "/tableau-de-bord/transactions" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Transactions
        </a>
        {isAdmin && (
          <>
            <a
              href="/tableau-de-bord/utilisateurs"
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                location.pathname === "/tableau-de-bord/utilisateurs" ? "text-primary" : "text-muted-foreground",
              )}
            >
              Utilisateurs
            </a>
            <a
              href="#"
              className={cn(
                "text-lg font-medium transition-colors hover:text-primary",
                location.pathname === "/tableau-de-bord/parametres" ? "text-primary" : "text-muted-foreground",
              )}
            >
              Paramètres
            </a>
          </>
        )}
      </nav>
      <div className="flex md:hidden">
        <Button variant="ghost" size="sm" className="px-0 text-base hover:bg-transparent focus:ring-0">
          <span className="sr-only">Open menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>
    </div>
  )
}

