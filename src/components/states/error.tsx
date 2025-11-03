import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export function Error({ error, className }: { error: Error | null, className?: string }) {
    return (
        <div className={cn(className ?? "min-h-svh grid place-items-center text-sm")}>
            <div className="flex items-center gap-2">
                <span>
                    <X className="size-3.5 mt-0.5" />
                </span>
                <span>{error?.message || "Something went wrong!"}</span>
            </div>
        </div>
    )
}