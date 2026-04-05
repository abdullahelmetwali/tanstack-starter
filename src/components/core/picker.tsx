import type { PickerType } from "@/types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/cn";
import { ChevronDown, ChevronsUpDown, HelpCircle, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";

import { TipOver } from "./tip-over";

export function Picker({
    label,
    placeHolder,
    className,
    required = false,

    value,
    setValue,
    setValueFor,
    errors,
    errorMessage,
    onReset,

    items,
    itemLabel = "name",
    itemValue = "id",
    ableToChooseUnactive = false,

    isLoading,
    error,

    tooltip,
    searchMode = false, // if true , it means that it will popover (have search)
    ...props
}: PickerType) {
    const { t } = useTranslation();
    const hasError = errors?.[setValueFor as string];

    const [search, setSearch] = useState("");
    const filteredItems = items?.filter((item) =>
        item[itemLabel]?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    return (
        <div className={
            cn("grid gap-1 h-fit relative",
                (value || tooltip) && "pe-7",
                label && "space-y-1",
                className
            )
        }>
            <div className="inline-flex items-center gap-2">
                <Label htmlFor={(setValueFor as string)} className="relative z-10 text-nowrap capitalize">
                    {required && '*'} {label}
                </Label>
                {(hasError || errorMessage) && (
                    <span className="text-xs text-destructive text-nowrap max-w-32">
                        {hasError?.message || errorMessage}
                    </span>
                )}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild
                    {...props as any}
                >
                    <Button
                        type="button"
                        variant="outline"
                        className={cn(
                            "flex justify-between w-full font-normal relative! z-30! border ring-ring bg-background! min-w-44",
                            value ? "opacity-100" : "opacity-60"
                        )}
                        aria-invalid={!!hasError}
                        {...props as any}
                    >
                        <span className="truncate max-w-[calc(100%-50px)] text-base lg:text-sm">
                            {/* truncate max-w-40 md:max-w-60 lg:max-w-28 2xl:max-w-40 */}
                            {
                                value ?
                                    items?.find((item: any) =>
                                        String(item[itemValue]) === String(value)
                                    )?.[itemLabel]
                                    :
                                    placeHolder
                            }
                        </span>
                        {
                            searchMode ?
                                <ChevronsUpDown className="ms-auto h-4 w-4 relative z-30 size-3.5!" />
                                :
                                <ChevronDown className="size-3.5!" />
                        }
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[calc(var(--radix-dropdown-menu-trigger-width)-20px)] md:w-[var(--radix-dropdown-menu-trigger-width)] p-1 space-y-0 bg-card">
                    {
                        searchMode ?
                            <div className="relative ps-4 w-full">
                                <Input
                                    aria-hidden={false}
                                    type="text"
                                    placeholder={placeHolder}
                                    value={search}
                                    onKeyDown={(e) => e.stopPropagation()}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="outline-none! border-none! ring-0! shadow-none! text-sm bg-transparent!"
                                />
                                <Search className="absolute top-2.75 start-1.5 size-3.5!" />
                            </div>
                            :
                            <DropdownMenuLabel className="py-0.5">
                                {label || placeHolder}
                            </DropdownMenuLabel>
                    }

                    <DropdownMenuSeparator className="bg-secondary" />

                    <div className="max-h-60 space-y-0.5! overflow-y-auto w-full">
                        {isLoading ? (
                            <p className="text-center text-sm p-4 animate-pulse">Loading...</p>
                        ) : error ? (
                            <p className="text-center text-sm text-destructive p-4">{error?.message}</p>
                        ) : filteredItems?.length === 0 ? (
                            <p className="text-center text-sm text-muted-foreground p-4">No results</p>
                        ) : (
                            filteredItems?.map((item: any, index: number) => {
                                const thisItemLabel = item[itemLabel];
                                const thisItemValue = item[itemValue];
                                const isDisabled = !ableToChooseUnactive && Number(item?.status) === 0;
                                const isChecked = String(value) === String(thisItemValue);
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={index}
                                        disabled={isDisabled}
                                        checked={isChecked}
                                        onCheckedChange={() => setValue(setValueFor, String(thisItemValue))}
                                        title={isDisabled ? t('custom.disabled') : thisItemLabel}
                                        className={cn("hover:bg-secondary cursor-pointer ps-2! [&_span]:end-2! [&_span]:start-auto justify-between",
                                            isChecked && "bg-muted",
                                            isChecked && isDisabled && "[&_span]:end-6!"
                                        )}
                                    >
                                        <p className="max-w-[calc(100%-35px)] truncate">
                                            {thisItemLabel}
                                        </p>
                                        {
                                            isDisabled &&
                                            <span className="size-2 rounded-full bg-destructive" />
                                        }
                                    </DropdownMenuCheckboxItem>
                                )
                            })
                        )}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>

            {
                (tooltip && !value)
                    ?
                    <TipOver
                        className={cn("absolute! end-0 z-0! [&_svg]:size-auto transition-all",
                            label ? "top-5.5" : "top-1"
                        )}
                        content={tooltip}
                        trigger={
                            <Button
                                className="ps-12! h-9 pe-2!"
                                variant={"outline"}
                                type="button"
                            >
                                <HelpCircle />
                            </Button>
                        }
                    />
                    :
                    <Button
                        type="button"
                        variant={"destructive"}
                        className={cn(
                            "absolute! end-0 z-0! ps-12! pe-2! h-9 [&_svg]:size-auto transition-all hover:bg-destructive/80",
                            value ? 'opacity-100 visible' : '-end-6 opacity-0 invisible pointer-events-none',
                            label ? "top-5.5" : "top-1.25"
                        )}
                        onClick={() => {
                            setValue(setValueFor, "");
                            onReset?.()
                        }}
                        {...props as any}
                    >
                        <X size={13} />
                    </Button>
            }
        </div>
    );
};