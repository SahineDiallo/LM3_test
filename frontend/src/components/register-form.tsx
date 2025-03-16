"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type RegisterFormData, registerSchema } from "@/lib/schemas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const { register } = useAuth();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      await register(data)
      navigate("/tableau-de-bord")
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
        // Map backend errors to form fields
        for (const [field, messages] of Object.entries(error)) {
          setError(field as keyof RegisterFormData, {
            type: "manual",
            message: messages.join(", "),
          })
        }
      } else {
        console.error("Erreur d'inscription:", error)
      }
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="space-y-6 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-3">
          <label htmlFor="email" className="text-sm font-medium">
            Adresse Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Entrez votre adresse email"
            className="rounded-none h-12 transition-all duration-300 border-gray-300"
            {...registerField("email")}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <label htmlFor="first_name" className="text-sm font-medium">
              Prénom
            </label>
            <Input
              id="first_name"
              placeholder="Entrez votre prénom"
              className="rounded-none h-12 transition-all duration-300 border-gray-300"
              {...registerField("first_name")}
            />
            {errors.first_name && <p className="text-sm text-red-500">{errors.first_name.message}</p>}
          </div>

          <div className="space-y-3">
            <label htmlFor="last_name" className="text-sm font-medium">
              Nom
            </label>
            <Input
              id="last_name"
              placeholder="Entrez votre nom"
              className="rounded-none h-12 transition-all duration-300 border-gray-300"
              {...registerField("last_name")}
            />
            {errors.last_name && <p className="text-sm text-red-500">{errors.last_name.message}</p>}
          </div>
        </div>

        <div className="space-y-3">
          <label htmlFor="mobile_phone" className="text-sm font-medium">
            Téléphone mobile
          </label>
          <Input
            id="mobile_phone"
            placeholder="Entrez votre numéro de téléphone"
            className="rounded-none h-12 transition-all duration-300 border-gray-300"
            {...registerField("mobile_phone")}
          />
          {errors.mobile_phone && <p className="text-sm text-red-500">{errors.mobile_phone.message}</p>}
        </div>

        <div className="space-y-3">
          <label htmlFor="password" className="text-sm font-medium">
            Mot de passe
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Entrez votre mot de passe"
              className="rounded-none h-12 transition-all duration-300 border-gray-300 pr-10"
              {...registerField("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 rounded-none"
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="space-y-3">
          <label htmlFor="re_password" className="text-sm font-medium">
            Confirmer le mot de passe
          </label>
          <div className="relative">
            <Input
              id="re_password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmez votre mot de passe"
              className="rounded-none h-12 transition-all duration-300 border-gray-300 pr-10"
              {...registerField("re_password")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          {errors.re_password && <p className="text-sm text-red-500">{errors.re_password.message}</p>}
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-[#1F0779] hover:bg-[#1F0779]/90 transition-all text-white duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Inscription en cours..." : "S'inscrire"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-gray-600">
          Vous avez déjà un compte ?{" "}
          <a href="/login" className="text-[#1F0779] hover:underline font-medium">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  )
}

