import type { PickerTypo } from "@/types";
import { useState } from "react";

import { cn } from "@/lib/cn";
import { FocusScope } from "@radix-ui/react-focus-scope";
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
import { ChevronDown, ChevronsUpDown, Search, X } from "lucide-react";

export function MultiPicker({
    label,
    placeHolder,
    className,
    required = false,

    value,
    setValue,
    setValueFor,
    errors,
    errorMessage,

    items,
    itemLabel = "name",
    itemValue = "id",

    isLoading,
    error,

    maxChoosed,
    variant = "container",
    searchMode = false,
    ...props
}: PickerTypo) {
    const hasError = errors?.[typeof setValueFor === "string" ? setValueFor : setValueFor?.join(".")];

    const [selected, setSelected] = useState(new Map());
    const addOrRemove = (id: string | number, value: Record<string, string>) => {
        setSelected(prev => {
            const updated = new Map(prev);
            if (updated.has(id)) updated.delete(id);
            else updated.set(id, value);

            setTimeout(() => setValue(setValueFor, Array.from(updated.values())), 20);
            return updated;
        });
    };

    const [search, setSearch] = useState("");
    const filteredItems = items?.filter((item) =>
        item[itemLabel]?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    return (
        <div className={cn("grid pt-1 gap-1 h-fit relative z-20 space-y-1", className)}>
            <div className="inline-flex items-center gap-2">
                <Label htmlFor={(setValueFor as string)} className="relative z-10 text-nowrap">
                    {required && '*'} {label}
                </Label>
                {(hasError || errorMessage) && (
                    <span className="text-[10px] text-destructive text-nowrap max-w-32">
                        {hasError?.message || errorMessage}
                    </span>
                )}
            </div>
            {
                variant === "container" ?
                    <div className="border rounded-sm" role="group" aria-invalid={!!hasError}>
                        {
                            searchMode &&
                            <div className="relative">
                                <Input
                                    placeholder={placeHolder}
                                    className="border-b! border-0 rounded-none ps-8 text-sm ring-0!"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Search className="absolute start-2.5 top-2.5 size-3.5 text-muted-foreground" />
                            </div>
                        }
                        <div className="max-h-72 min-h-20 overflow-y-auto w-full p-3 flex flex-wrap items-center gap-2">
                            {isLoading ? (
                                <p className="text-center text-sm p-4 animate-pulse w-full">Loading...</p>
                            ) : error ? (
                                <p className="text-center text-sm p-4 text-destructive w-full">
                                    {error?.message || "Failed"}
                                </p>
                            ) : filteredItems?.length === 0 ? (
                                <p className="text-center text-sm text-muted-foreground p-4 w-full">
                                    No results
                                </p>
                            ) : (
                                filteredItems.map((item, index) => {
                                    const thisItemLabel = item[itemLabel];
                                    const thisItemValue = item[itemValue];
                                    const disabled = !selected.has(thisItemValue) && (Number(item?.status) === 0 || selected.size === maxChoosed);
                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            disabled={disabled}
                                            onClick={() => addOrRemove(thisItemValue, {
                                                id: thisItemValue,
                                                [itemLabel]: thisItemLabel
                                            })}
                                            className={cn("flex gap-1 items-center text-sm px-3 py-1 rounded-2xl hover:bg-muted",
                                                disabled && "cursor-not-allowed opacity-50 bg-transparent!",
                                                selected.has(thisItemValue) && "bg-border opacity-100 cursor-pointer"
                                            )}
                                        >
                                            {selected.has(thisItemValue) && (
                                                <X className="size-3.5 mt-0.5 text-primary" />
                                            )}
                                            <span className={cn("truncate max-w-28",
                                                Number(item?.status) === 0 && "text-destructive cursor-not-allowed!"
                                            )}
                                                title={Number(item?.status) === 0 ?
                                                    `${thisItemLabel} is unactive` : thisItemLabel
                                                }
                                            >
                                                {thisItemLabel}
                                            </span>
                                        </button>
                                    )
                                })
                            )}
                        </div>
                    </div>
                    :
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild
                            {...props as any}
                        >
                            <Button
                                type="button"
                                variant="outline"
                                className="flex justify-between w-full font-normal relative z-30 border border-input bg-background!"
                                aria-invalid={!!hasError}
                                {...props as any}
                            >
                                <span className={cn("truncate max-w-60",
                                    !selected.size && "text-muted-foreground"
                                )}>
                                    {
                                        selected.size ?
                                            Array.from(selected.values())?.map(v => v?.[itemLabel]).join(" / ")
                                            :
                                            placeHolder
                                    }
                                </span>
                                {
                                    searchMode ?
                                        <ChevronsUpDown className="ms-auto h-4 w-4 relative z-30" />
                                        :
                                        <ChevronDown className="ms-auto h-4 w-4 relative z-30" />
                                }
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] p-1 space-y-2 bg-card">
                            {
                                searchMode ?
                                    <>
                                        <div className="relative ps-4 w-full h-7">
                                            <FocusScope>
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
                                                <Search className="absolute top-2.5 start-1 size-4!" />
                                            </FocusScope>
                                        </div>
                                    </>
                                    :
                                    <DropdownMenuLabel className="text-xs pb-0">
                                        {label}
                                    </DropdownMenuLabel>
                            }
                            <DropdownMenuSeparator className="bg-secondary" />

                            <div className="max-h-60 overflow-y-auto w-full">
                                {isLoading ? (
                                    <p className="text-center text-sm p-4 animate-pulse">Loading...</p>
                                ) : error ? (
                                    <p className="text-center text-sm text-destructive p-4">
                                        {error?.message || "Failed"}
                                    </p>
                                ) : filteredItems?.length === 0 ? (
                                    <p className="text-center text-sm text-muted-foreground p-4">No results</p>
                                ) : (
                                    filteredItems.map((item, index) => {
                                        const thisItemLabel = item[itemLabel];
                                        const thisItemValue = item[itemValue];
                                        const isDisabled = !selected.has(thisItemValue) &&
                                            (Number(item?.status) === 0 || selected.size === maxChoosed);
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={index}
                                                className="hover:bg-secondary cursor-pointer truncate max-w-[calc(var(--radix-dropdown-menu-trigger-width)-10px)] p-2 [&_span]:end-2 [&_span]:start-auto"

                                                disabled={isDisabled}
                                                title={isDisabled ? "Disabled" : thisItemLabel}
                                                checked={selected.has(thisItemValue)}

                                                onSelect={(e) => e.preventDefault()}
                                                onCheckedChange={() => addOrRemove(thisItemValue, {
                                                    id: thisItemValue,
                                                    [itemLabel]: thisItemLabel
                                                })}
                                            >
                                                {thisItemLabel}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })
                                )}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
            }
        </div>
    )
}