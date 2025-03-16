import { useAuthStore } from "@/store/auth-store"

interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  mobile_phone: string
  is_admin: boolean
  token: string
}
export const useAuth = () => {
  const { user, isAuthenticated, setUser, logout } = useAuthStore()
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const login = async (email: string, password: string) => {
    try {
      // Call the login API endpoint (the django one of course)
      const response = await fetch(`${baseUrl}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw errorData
      }

      const data = await response.json()

      // Update the global state of my store man.
      setUser({
        id: data.user.id,
        email: data.user.email,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
        mobile_phone: data.user.mobile_phone,
        is_admin: data.user.is_admin,
        token: data.access, 
      })

      // Store the token and its expiration time
      const tokenExpirationTime = Date.now() + 5 * 60 * 1000 // 5 minutes
      localStorage.setItem("token", data.access)
      localStorage.setItem("refreshToken", data.refresh)
      localStorage.setItem("tokenExpirationTime", tokenExpirationTime.toString())

      // Start the token refresh timer
      startTokenRefreshTimer(tokenExpirationTime - Date.now())

    } catch (error) {
      console.error("Erreur de connexion:", error)
      throw error 
    }
  }
  const refreshToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken")
      if (!refreshToken) {
        throw new Error("No refresh token found")
      }
  
      const response = await fetch(`${baseUrl}/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      })
  
      if (!response.ok) {
        throw new Error("Failed to refresh token")
      }
  
      const data = await response.json()
  
      // Update the stored token and its expiration time
      const tokenExpirationTime = Date.now() + 15 * 60 * 1000 
      localStorage.setItem("token", data.access)
      localStorage.setItem("tokenExpirationTime", tokenExpirationTime.toString())
  
      // Update the global state with the new token
      setUser((prevUser: User) => ({
        ...prevUser,
        token: data.access,
      }))
  
      // Restart the token refresh timer
      startTokenRefreshTimer(tokenExpirationTime - Date.now())
    } catch (error) {
      console.error("Erreur de rafraîchissement du token:", error)
      logout();
    }
  }

  const startTokenRefreshTimer = (delay: number) => {
    setTimeout(() => {
      refreshToken()
    }, delay - 60000) 
  }
  

  

  const registerUser = async (userData: {
    email: string
    first_name: string
    last_name: string
    mobile_phone: string
    password: string
    re_password: string
  }) => {
    try {
      // Call the register API endpoint
      const response = await fetch(`${baseUrl}/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw errorData
      }

      // Automatically log in the user after registration
      if (response.status === 201) await login(userData.email, userData.password)
    } catch (error) {
      console.error("Erreur d'inscription:", error)
      throw error // Re-throw the error for handling in the component
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    register: registerUser,
    logout,
  }
}