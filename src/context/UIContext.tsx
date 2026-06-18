import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface UIContextValue {
    menuOpen: boolean;
    searchOpen: boolean;
    openMenu: () => void;
    closeMenu: () => void;
    toggleMenu: () => void;
    openSearch: () => void;
    closeSearch: () => void;
    toggleSearch: () => void;
}

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const openMenu = useCallback(() => setMenuOpen(true), []);
    const closeMenu = useCallback(() => setMenuOpen(false), []);
    const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

    const openSearch = useCallback(() => setSearchOpen(true), []);
    const closeSearch = useCallback(() => setSearchOpen(false), []);
    const toggleSearch = useCallback(() => setSearchOpen((v) => !v), []);

    return (
        <UIContext.Provider
            value={{ menuOpen, searchOpen, openMenu, closeMenu, toggleMenu, openSearch, closeSearch, toggleSearch }}
        >
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const ctx = useContext(UIContext);
    if (!ctx) throw new Error("useUI must be used within UIProvider");
    return ctx;
}
