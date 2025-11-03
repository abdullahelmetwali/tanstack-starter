import { Loader } from "lucide-react";
import { cn } from "@/lib/cn";

export function Loading({ className }: { className?: string }) {
    return (
        <div className={cn(className ?? "min-h-svh grid place-items-center text-sm")}>
            <div className="flex items-center gap-2">
                <span>
                    <Loader className="animate-spin size-3.5" />
                </span>
                <span>Loading</span>
            </div>
        </div>
    )
}