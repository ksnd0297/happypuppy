import { getChats } from "@/app/services/chat/chat";
import { GetChatsParams } from "@/app/services/chat/types";
import { skipToken, useQuery } from "@tanstack/react-query";

const getChatListQueryKey = (placeId?: number) => ["GET_CHAT_LIST", placeId];

const getChatListQueryFn = (params: GetChatsParams) => getChats(params);

type Props = {
  placeId?: number;
};

const useGetChatList = (props: Props) => {
  const { placeId } = props;

  return useQuery({
    queryKey: getChatListQueryKey(placeId),
    queryFn: placeId ? () => getChatListQueryFn({ placeId }) : skipToken,
    enabled: !!placeId,
    refetchOnMount: true,
  });
};

export default useGetChatList;
