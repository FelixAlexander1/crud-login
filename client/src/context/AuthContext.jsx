import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest,verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
       throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const [errors, setErrors] = useState([]); 
    const [loading, setLoading] = useState(true);
    

    const signup = async (user) => {
        try {
            console.log("Datos enviados:", user); 
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Error en signup:", error);
            console.log("Respuesta del servidor:", error.response?.data);
            setErrors(error.response?.data || ["Error desconocido"]);
        }
    };

    const signin = async (user) => { 
        try {
            const res = await loginRequest(user);
            console.log("Respuesta del servidor:", res.data);
            setIsAuthenticated(true);
            setUser(res.data); 
        } catch (error) {
            console.error("Error en signin:", error);
    
            
            if (!error.response) {
                setErrors(["Error de red. No se pudo conectar con el servidor."]);
                return;
            }
    
            // Maneja errores esperados (por ejemplo, credenciales incorrectas)
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
    
            
            setErrors([error.response.data?.message || "Error desconocido"]);
        }
    };
    

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

   

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
        if (!cookies.token) {
            setIsAuthenticated(false);
            setLoading(false);
            return setUser(null);
           }
            try {
               const res = await verifyTokenRequest(cookies.token);
               if(!res.data) {
                setIsAuthenticated(false)
                setLoading(false);
                return;
               }
                
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
            
        }
        
        checkLogin()
    }, []);

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            logout, 
            loading,
            user,
            isAuthenticated, 
            errors
        }}>
            {children}
        </AuthContext.Provider>
    );
};