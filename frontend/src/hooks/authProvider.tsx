import { createContext, useContext } from 'react';
import { useAuth } from './useAuth';

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const auth = useAuth(); 

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuthContext = () => {
  return useContext(AuthContext);
};