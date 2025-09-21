import { QueryKey, UseQueryOptions as BaseUseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type UseQueryOptions<T, K = T> = Omit<BaseUseQueryOptions<T, AxiosError, K, QueryKey>, "queryKey" | "queryFn">;
