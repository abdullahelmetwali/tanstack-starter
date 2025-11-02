import { useLocation } from "@tanstack/react-router";

export function Footer() {
    const location = useLocation();
    if (location.pathname === "/login") return null;
    return (
        <footer className="grid place-items-center border-t h-20">
            Footer
        </footer>
    )
}