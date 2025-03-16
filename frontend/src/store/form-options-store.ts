import { create } from "zustand"

interface OptionsStore {
  currencies: { id: string; code: string; name: string }[]
  categories: { id: string; name: string }[]
  fetchCurrencies: () => Promise<void>
  fetchCategories: () => Promise<void>
}

export const useOptionsStore = create<OptionsStore>((set) => ({
  currencies: [],
  categories: [],
  fetchCurrencies: async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/currencies/`)
    const data = await response.json();
    set({ currencies: data })
  },
  fetchCategories: async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/categories/`)
    const data = await response.json()
    set({ categories: data })
  },
}))