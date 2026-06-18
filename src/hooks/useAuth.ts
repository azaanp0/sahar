import { useStore } from "@/context/StoreContext";

export const useAuth = () => {
    const { user, login, register, logout } = useStore();

    return {
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout
    };
};
