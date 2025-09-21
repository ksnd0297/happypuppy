import { skipToken, useQuery } from "@tanstack/react-query";
import { getUsersCheck } from "../services/users/users";
import { UserCheckResponse } from "../services/users/types";
import { UseQueryOptions } from "../types/base";

const userCheckQueryKey = (appUserId?: number) => ["userCheck", appUserId];
const userCheckQueryFn = async (appUserId: number) => getUsersCheck({ appUserId });

type Props = {
  appUserId?: number;
  options?: UseQueryOptions<UserCheckResponse>;
};

const useUserCheck = (props: Props) => {
  const { appUserId, options } = props;

  return useQuery({
    queryKey: userCheckQueryKey(appUserId),
    queryFn: appUserId ? () => userCheckQueryFn(appUserId) : skipToken,
    ...options,
  });
};

export default useUserCheck;
