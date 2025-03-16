import { LoginForm } from "@/components/login-form";
import cardImage from "../assets/images/login.png"

export default function Page() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Section */}
      <div className="p-8 lg:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-12">
            <h1 className="text-2xl font-bold inline-flex items-center">
              <span className="text-[#1F0779]">Trans</span>
              <span className="text-orange-500">action</span>
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Bonjour, Bienvenue !</h2>
            <p className="text-gray-600">Gérez vos transactions financières en un seul endroit</p>
          </div>

          <LoginForm />

          <div className="mt-8 text-center text-sm text-gray-500">©2025 Tous droits réservés Transaction</div>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative bg-[#1F0779] p-8 lg:p-12 flex flex-col justify-between items-center text-white">
        <div className="max-w-xl">
          <h2 className="text-4xl font-light mb-8 leading-relaxed">
            Suivez et gérez vos transactions financières en toute simplicité
          </h2>

          {/* Mockup UI */}
          <div className="bg-white rounded-lg p-6 text-black mt-8 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-sm font-medium text-gray-700">Tableau de bord</div>
            </div>

            <div className="mt-4 space-y-3">
              <img src={cardImage} alt="login image" className="w-full object-contain" />
              </div>
          </div>
        </div>

        <div className="mt-auto pt-8 flex justify-between text-sm text-white/70">
          <span>©2025 Tous droits réservés Transaction</span>
          <a href="/politique-confidentialite" className="hover:text-white">
            Politique de confidentialité et conditions d&apos;utilisation
          </a>
        </div>
      </div>
    </div>
  )
}

