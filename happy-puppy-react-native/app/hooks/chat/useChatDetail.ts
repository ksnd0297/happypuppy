import { getChatDetail } from "@/app/services/chat/chat";
import { ChatDetailResponse } from "@/app/services/chat/types";
import { UseQueryOptions } from "@/app/types/base";
import { useQuery } from "@tanstack/react-query";

const chatDetailQueryKey = (chatId?: number) => ["chatDetail", chatId];
const chatDetailQueryFn = (chatId: number) => getChatDetail({ chatId });

type Props = {
  chatId: number;
  options?: UseQueryOptions<ChatDetailResponse>;
};

const useChatDetail = (props: Props) => {
  const { chatId, options } = props;

  return useQuery({
    queryKey: chatDetailQueryKey(chatId),
    queryFn: () => chatDetailQueryFn(chatId),
    ...options,
  });
};

export default useChatDetail;
