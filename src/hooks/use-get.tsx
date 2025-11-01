import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { UseQueryOptions } from "@tanstack/react-query";

type UseGetProps<T> = {
    url: string;
    cacheKey?: string;
    props?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">;
};

export function useGet<T = any>({ url, cacheKey, props }: UseGetProps<T>) {
    const { i18n } = useTranslation();
    const baseURL = import.meta.env.VITE_API;

    const urlToFetch = `${baseURL}/${i18n.language}/${url}`;

    const query = useQuery<T, Error>({
        queryKey: [cacheKey || url],
        queryFn: async () => {
            const { data } = await axios.get(urlToFetch);
            return data;
        },
        ...props,
    });

    return query;
}
