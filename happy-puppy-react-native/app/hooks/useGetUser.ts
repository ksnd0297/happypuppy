import { skipToken, useQuery } from "@tanstack/react-query";
import { getUsers } from "../services/users/users";
import { UseQueryOptions } from "../types/base";
import { UserResponse } from "../services/users/types";

const getUserQueryKey = (id?: number) => ["getUser", id || null];
const getUserQueryFn = (id: number) => getUsers({ id });

type Props = {
  id?: number;
  options?: UseQueryOptions<UserResponse>;
};

const useGetUser = (props: Props) => {
  const { id, options } = props;

  return useQuery({
    queryKey: getUserQueryKey(id),
    queryFn: id ? () => getUserQueryFn(id) : skipToken,
    ...options,
  });
};

export default useGetUser;
