import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

const MOBILE_BREAKPOINT = 1024;

interface IsMobileValue {
    isMobile: boolean;
}

const IsMobileContext = createContext<IsMobileValue | null>(null);

export function IsMobileProvider({ children }: { children: ReactNode }) {
    const [isMobile, setIsMobile] = useState<boolean>(
        () => typeof window !== "undefined"
            ? window.innerWidth < MOBILE_BREAKPOINT
            : false
    );

    useEffect(() => {
        const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, []);

    return (
        <IsMobileContext.Provider value={{ isMobile }}>
            {children}
        </IsMobileContext.Provider>
    );
}

export function useIsMobile(): IsMobileValue {
    const ctx = useContext(IsMobileContext);
    if (!ctx) throw new Error("useIsMobile must be used within <IsMobileProvider>");
    return ctx;
}