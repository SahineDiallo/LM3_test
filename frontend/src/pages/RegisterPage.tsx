import { RegisterForm } from "../components/register-form";
import cardImage from "../assets/images/login.png"

export default function RegisterPage() {
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
            <h2 className="text-2xl font-bold mb-2">Créer un compte</h2>
            <p className="text-gray-600">Rejoignez notre plateforme pour gérer vos transactions</p>
          </div>

          <RegisterForm />

          <div className="mt-8 text-center text-sm text-gray-500">©2025 Tous droits réservés Transaction</div>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative bg-[#1F0779] p-8 lg:p-12 flex flex-col justify-center text-white">
        <div className="max-w-xl">
          <h2 className="text-4xl mb-8 leading-relaxed font-medium">
            Suivez et gérez vos transactions financières en toute simplicité
          </h2>

          {/* Mockup UI */}
          <div className="bg-white rounded-lg p-6 text-black mt-8 shadow-lg">
            <img src={cardImage} alt="" className="w-full object-contain" />
          </div>
        </div>

        <div className="mt-auto pt-8 flex justify-between text-sm text-white/70">
          <span>©2025 Tous droits réservés Transaction</span>
          <a href="#" className="hover:text-white">
            Politique de confidentialité et conditions d&apos;utilisation
          </a>
        </div>
      </div>
    </div>
  )
}

