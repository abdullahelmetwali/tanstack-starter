import type { PickerTypo } from "@/types";
import { useState } from "react";

import { cn } from "@/lib/cn";
import { FocusScope } from "@radix-ui/react-focus-scope";
import { ChevronsUpDown, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";

export function Picker({
    label,
    placeHolder,
    className,
    required = false,

    value,
    setValue,
    setValueFor,
    onReset,
    errors,
    errorMessage,

    items,
    itemLabel = "name",
    itemValue = "id",

    isLoading,
    error,

    searchMode = false, // if true , it means that it will have search => Dropdownmenu
    ...props
}: PickerTypo) {
    const hasError = errors?.[typeof setValueFor === "string" ? setValueFor : setValueFor?.join(".")];

    const [search, setSearch] = useState("");
    const filteredItems = items?.filter((item) =>
        item[itemLabel]?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    return (
        <div className={cn("grid gap-1 pt-1 h-fit relative z-20 space-y-1", value ? 'pe-4' : '', className)}>
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
                searchMode ?
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild
                            {...props as any}
                        >
                            <Button
                                type="button"
                                variant="outline"
                                className={cn(
                                    "flex justify-between w-full font-normal relative z-50 border bg-background! min-w-64! h-8",
                                    value ? "opacity-100" : "opacity-60"
                                )}
                                aria-invalid={!!hasError}
                                {...props as any}
                            >
                                <span className="truncate max-w-60">
                                    {/* truncate max-w-40 md:max-w-60 lg:max-w-28 2xl:max-w-40 */}
                                    {
                                        value ?
                                            items?.find(item =>
                                                String(item[itemValue]) === String(value)
                                            )?.[itemLabel]
                                            :
                                            placeHolder
                                    }
                                </span>
                                <ChevronsUpDown className="ms-auto h-4 w-4 relative z-30" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] px-2 space-y-2 bg-card">
                            <div className="relative ps-4 h-7">
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

                            <DropdownMenuSeparator className="bg-secondary" />

                            <div className="max-h-60 overflow-y-auto w-full">
                                {isLoading ? (
                                    <p className="text-center text-sm p-4 animate-pulse">Loading...</p>
                                ) : error ? (
                                    <p className="text-center text-sm text-destructive p-4">{error?.message}</p>
                                ) : filteredItems?.length === 0 ? (
                                    <p className="text-center text-sm text-muted-foreground p-4">No results</p>
                                ) : (
                                    filteredItems.map((item, index) => {
                                        const thisItemLabel = item[itemLabel];
                                        const thisItemValue = item[itemValue];
                                        const isDisabled = Number(item?.status) === 0;
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={index}
                                                disabled={isDisabled}
                                                checked={String(value) === String(thisItemValue)}
                                                onCheckedChange={() => setValue(setValueFor, String(thisItemValue))}
                                                title={isDisabled ? 'Disabled' : thisItemLabel}
                                                className="hover:bg-secondary cursor-pointer p-2 truncate max-w-[calc(var(--radix-dropdown-menu-trigger-width)-5px)] [&_span]:end-2! [&_span]:start-auto justify-between h-7"
                                            >
                                                {thisItemLabel}
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
                    :
                    <Select
                        value={value}
                        onValueChange={(value) => setValue(setValueFor, value?.toString())}
                        required={required}
                        {...props as any}
                    >
                        <SelectTrigger
                            type="button"
                            className="relative z-50 bg-background! h-8! w-[var(--radix-dropdown-menu-trigger-width)]"
                            id={setValueFor}
                            aria-invalid={!!hasError}
                            {...props as any}
                        >
                            <SelectValue placeholder={placeHolder} className="relative z-50 bg-background" />
                        </SelectTrigger>
                        <SelectContent className="relative z-50 max-h-64 overflow-y-scroll">
                            <SelectGroup>
                                <SelectLabel className="text-xs!">{label}</SelectLabel>
                                {
                                    isLoading ? (
                                        <p className="text-center text-sm p-4 bg-card animate-pulse">Loading...</p>
                                    ) : error ? (
                                        <p className="text-center text-sm text-destructive">{error?.message}</p>
                                    ) : (
                                        items?.length > 0 ?
                                            items?.map((item, i) => {
                                                const thisItemLabel = item[itemLabel];
                                                const thisItemValue = item[itemValue]?.toString();
                                                const isDisabled = Number(item?.status) === 0;
                                                return (
                                                    <SelectItem
                                                        key={i}
                                                        value={thisItemValue}
                                                        disabled={isDisabled}
                                                        className="hover:bg-card flex items-center justify-between"
                                                        title={isDisabled ? `${thisItemLabel} is unactive` : thisItemLabel}
                                                    >
                                                        {thisItemLabel}
                                                        {
                                                            isDisabled &&
                                                            <span className="size-2 rounded-full bg-destructive" />
                                                        }
                                                    </SelectItem>
                                                )
                                            })
                                            :
                                            <p className="grid place-items-center p-3 text-sm text-muted-foreground">
                                                No results
                                            </p>
                                    )
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
            }
            <Button
                type="button"
                variant={"destructive"}
                className={cn(
                    "absolute z-10 ps-8! h-7 [&_svg]:size-auto transition-all w-4!",
                    value ? '-end-3 opacity-100 visible' : '-end-6 opacity-0 invisible pointer-events-none',
                    label ? "top-7" : "top-2.5"
                )}
                onClick={() => {
                    setValue(setValueFor, "");
                    onReset?.()
                }}
                {...props as any}
            >
                <X size={13} className="me-1" />
            </Button>
        </div>
    );
};