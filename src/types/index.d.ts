// write your app types here
export interface PickerTypo extends React.ComponentProps<"button"> {
    label?: string,
    placeHolder: string,
    className?: string,
    required?: boolean,

    value: string | Array<any>,
    setValue?: UseFormSetValue | Dispatch<SetStateAction<any>>,
    setValueFor?: string | Array<string>,
    onReset?: () => void,

    errors?: FieldErrors<FieldValues>,
    errorMessage?: string,

    items: Array<any>,
    itemLabel?: string | "name",
    itemValue?: string | "id",

    isLoading?: boolean | undefined | null,
    error?: Error | undefined | null,
    searchMode?: boolean | true,

    maxChoosed?: number,
    variant?: "dropdown" | "container",
};