// if 2 languages prefers to use button
// if more than two => there is a select

import { ChevronDown, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LanguageSwitcher({ variant = "button" }: { variant?: "button" | "select" }) {
    const { i18n } = useTranslation();

    const toggleLanguage = (language: "en" | "ar" | "fr") => {
        i18n.changeLanguage(language);
        document.body.dir = language === "ar" ? "rtl" : "ltr";
    };

    return (
        <div>
            {
                variant === "button" ?
                    (
                        <Button variant={"outline"} size={"icon-sm"}
                            onClick={() => toggleLanguage(i18n.language === "en" ? "ar" : "en")}>
                            <Languages />
                        </Button>
                    )
                    :
                    (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"outline"} className="h-6 text-xs rounded w-28 justify-between">
                                    {i18n.language === "en" ?
                                        "English"
                                        :
                                        i18n.language === "ar" ?
                                            "اللغة العربية"
                                            :
                                            "Français"
                                    }
                                    <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="*:h-6 w-36" align="end">
                                <DropdownMenuItem onClick={() => toggleLanguage("en")}>
                                    English
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleLanguage("ar")}>
                                    اللغة العربية
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleLanguage("fr")}>
                                    Français
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
            }
        </div>
    )
}