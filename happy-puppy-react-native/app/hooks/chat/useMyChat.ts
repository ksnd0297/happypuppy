import { getMyChat } from "@/app/services/chat/chat";
import { ChatResponse } from "@/app/services/chat/types";
import { UseQueryOptions } from "@/app/types/base";
import { skipToken, useQuery } from "@tanstack/react-query";

const myChatQueryKey = (userId?: number) => ["myChat", userId];
const myChatQueryFn = (userId: number) => getMyChat({ userId });

type Props = {
  userId?: number;
  options?: UseQueryOptions<ChatResponse[]>;
};

const useMyChat = (props: Props) => {
  const { userId, options } = props;

  return useQuery({
    queryKey: myChatQueryKey(userId),
    queryFn: userId ? () => myChatQueryFn(userId) : skipToken,
    ...options,
  });
};

export default useMyChat;
