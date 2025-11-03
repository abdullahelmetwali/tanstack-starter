import { format } from "date-fns";
import { useState } from "react";

export const FormattedDate = ({ date }: { date: string | null }) => {
    const [formatCounter, setFormatCounter] = useState(0);
    const formatExtensions = [
        "yyyy-MM-dd",
        "dd/MM/yyyy",
        "MM/dd/yyyy",
        "do MMMM yyyy",
        "dd MMM yyyy",
        "PPP",
        "PP",
        "EEE, MMM d",
        "HH:mm:ss",
    ];

    const seeAnotherFormats = () => {
        if (formatCounter === formatExtensions.length - 1) {
            setFormatCounter(0);
        } else {
            setFormatCounter(prev => prev + 1);
        }
    };

    return (
        <span onClick={seeAnotherFormats} className="cursor-pointer select-none"
            title={date ? format(date, formatExtensions[formatCounter]) : ''}
        >
            {date ? format(date, formatExtensions[formatCounter]) : 'N/A'}
        </span>

    )
}