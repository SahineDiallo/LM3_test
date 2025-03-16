"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type LoginFormData, loginSchema } from "@/lib/schemas"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [userError, setUserError] = useState("")
  const {login} = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      await login(data.email, data.password);
      navigate("/tableau-de-bord")
    } catch (error) {
      if (typeof error === 'object' && error !== null) {
          console.log("set the user errors");
          setUserError("Aucun compte actif trouvé avec les identifiants fournis")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 w-full">
      {userError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-se-md">
          {userError}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Adresse Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="Entrez votre email"
            className={`${errors.email ? "border-red-500" : "border-gray-400"} rounded-none h-12 transition-all duration-300`}
            {...register("email")}
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Mot de passe
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Entrez votre mot de passe"
              className="rounded-none h-12 transition-all duration-300 border-gray-300 pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label htmlFor="remember" className="text-sm text-gray-500 cursor-pointer">
              Rester connecté
            </label>
          </div>
          <a href="#" className="text-sm text-[#1F0779] hover:underline">
            Mot de passe oublié ?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-white bg-[#1F0779] hover:bg-[#1F0779]/90 transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Connexion en cours..." : "Connexion"}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-gray-600">
          Vous n&apos;avez pas de compte ?{" "}
          <a href="/register" className="text-[#1F0779] hover:underline font-medium">
            S&apos;inscrire
          </a>
        </p>
      </div>
    </div>
  )
}

