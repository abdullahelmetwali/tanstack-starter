// write your app types here
export interface PickerType extends React.ComponentProps<"button"> {
    label?: string,
    placeHolder: string,
    className?: string,
    required?: boolean,

    value: string | number,
    setValueFor: string,
    setValue?: UseFormSetValue | Dispatch<SetStateAction<any>>,
    onReset?: () => void,

    register?: UseFormRegister | null,
    errors?: FieldErrors<FieldValues>,
    errorMessage?: string,

    items: any[],
    itemLabel?: string | "name",
    itemValue?: string | "id",
    ableToChooseUnactive?: boolean,

    isLoading?: boolean | undefined | null,
    error?: Error | undefined | null,
    searchMode?: boolean | true,

    maxChoosed?: number,
    variant?: "dropdown" | "container",
    tooltip?: string
};

export interface CalendarDateTypo {
    date: string | Date | any,
    errors: FieldError<FieldValues>,
    setValue: UseFormSetValue,
    setValueFor?: string | "date",
    label?: string,
};