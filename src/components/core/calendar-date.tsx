import type { CalendarDateTypo } from "@/types";
import { useState } from "react";
import { format } from "date-fns";

import { CalendarFold } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar";

export const CalendarDate = ({ date, errors, setValue, setValueFor = "date", label }: CalendarDateTypo) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="space-y-1">
            <Label htmlFor="date" className="inline-flex gap-2 items-center">
                {label ? label : "Date"}
                {typeof errors?.[setValueFor]?.message === 'string' && (
                    <span className="text-xs text-destructive max-w-64 max-md:max-w-44 truncate">
                        {errors?.[setValueFor].message}
                    </span>
                )}
            </Label>

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild id="date">
                    <Button variant={"outline"}
                        className="w-full justify-between"
                        aria-invalid={!!errors?.[setValueFor]}
                    >
                        {date ? format(date, "PPPP") : "Select a date"}
                        <CalendarFold className="text-muted-foreground mt-1" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="relative z-50 p-1 bg-background border pointer-events-auto">
                    <Calendar
                        className="w-full rounded-md"
                        mode="single"
                        selected={date}
                        onSelect={(selected) => {
                            if (!selected) return;
                            const year = selected?.getFullYear();
                            const month = selected?.getMonth() + 1;
                            const day = selected?.getDate();

                            const formatted = `${year}-${month}-${day}`;
                            setValue(setValueFor, formatted, { shouldValidate: true });
                            setOpen(false);
                        }}
                        captionLayout="dropdown"
                        required
                    />

                </PopoverContent>
            </Popover>
        </div>
    )
}