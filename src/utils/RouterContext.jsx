import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";

export const RouterContext = createContext();

export const RouterProvider = ({ children }) => {
    const router = useRouter(); 
    return (
        <RouterContext.Provider value={router}>
            {children}
        </RouterContext.Provider>
    );
}

export const useRouterContext = () => useContext(RouterContext);

