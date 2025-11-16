import { QueryKey, UseQueryOptions as BaseUseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type UseQueryOptions<T, K = T> = Omit<BaseUseQueryOptions<T, AxiosError, K, QueryKey>, "queryKey" | "queryFn">;

export type RequireKeys<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
