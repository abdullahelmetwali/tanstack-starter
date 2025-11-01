import { AirplayIcon, CloudSun, Monitor, Moon, Sun } from "lucide-react";

import { cn } from "@/lib/cn";
import { useTheme } from "@/store/theme-provider";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function ThemeSwitcher({ variant = "button" }: { variant?: "button" | "select" | "group" }) {
    const { setTheme, theme } = useTheme();
    return (
        <div>
            {
                variant === "button" && (
                    <Button variant={"outline"} size={"sm"} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                        {theme === "dark" ? <Moon /> : <Sun />}
                    </Button>
                )
            }
            {
                variant === "select" && (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant={"outline"} size={"sm"}>
                                <CloudSun />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="min-w-48">
                            <DropdownMenuItem onClick={() => setTheme("dark")} className="justify-between">
                                <span>
                                    Dark Mode
                                </span>
                                <Moon className="size-4" />
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("light")} className="justify-between">
                                <span>
                                    Light Mode
                                </span>
                                <Sun className="size-4" />
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")} className="justify-between">
                                <span>
                                    System Mode
                                </span>
                                <Monitor className="size-4" />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
            {
                variant === "group" && (
                    <div className="flex items-center gap-2 border rounded-2xl *:py-1 *:px-2 w-fit">
                        <Tooltip>
                            <TooltipTrigger onClick={() => setTheme("light")}
                                className={cn(theme === "light" ? "border-e rounded-full" : "border-0")}
                            >
                                <Sun size={14} />
                            </TooltipTrigger>
                            <TooltipContent>
                                Light Mode
                                {/* {t('custom.light')} */}
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger onClick={() => setTheme("dark")}
                                className={cn(theme === "dark" ? "border-x rounded-full" : "border-0")}
                            >
                                <Moon size={14} />
                            </TooltipTrigger>
                            <TooltipContent>
                                Dark Mode
                                {/* {t('custom.dark')} */}
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger onClick={() => setTheme("system")}
                                className={cn(theme === "system" ? "border-s rounded-full" : "border-0")}                                                >
                                <AirplayIcon size={14} />
                            </TooltipTrigger>
                            <TooltipContent>
                                System Mode
                                {/* {t('custom.system')} */}
                            </TooltipContent>
                        </Tooltip>
                    </div>
                )
            }
        </div>
    )
}