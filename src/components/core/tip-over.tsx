import { cn } from "@/lib/cn";
import { useIsMobile } from "@/context/is-mobile";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface TipOverProps {
    trigger: React.ReactNode | string;
    content?: React.ReactNode | string;
    className?: string;
}

export function TipOver({ trigger, content, className }: TipOverProps) {
    const { isMobile } = useIsMobile();

    const isDisabled = !trigger;

    if (isMobile) {
        return (
            <Popover>
                <PopoverTrigger
                    className={cn("h-fit opacity-100!", className)}
                    disabled={isDisabled}
                    asChild
                >
                    <div aria-disabled={isDisabled}>
                        {trigger || "N/A"}
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-fit py-1 px-4 bg-foreground text-primary-foreground">
                    {content ?? trigger}
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Tooltip>
            <TooltipTrigger
                disabled={isDisabled}
                asChild
            >
                <div className={cn("w-fit opacity-100!", className)} aria-disabled={isDisabled}>
                    {trigger || "N/A"}
                </div>
            </TooltipTrigger>
            <TooltipContent>{content ?? trigger}</TooltipContent>
        </Tooltip>
    );
}