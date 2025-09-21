import { getChatMembers } from "@/app/services/chat/chat";
import { ChatMemberResponse } from "@/app/services/chat/types";
import { UseQueryOptions } from "@/app/types/base";
import { useQuery } from "@tanstack/react-query";

const chatMembersQueryKey = (chatId: number) => ["chatMembers", chatId];
const chatMembersQueryFn = (chatId: number) => getChatMembers({ chatId });

type Props = {
  chatId: number;
  options?: UseQueryOptions<ChatMemberResponse[]>;
};

const useChatMembers = (props: Props) => {
  const { chatId, options } = props;

  return useQuery({
    queryKey: chatMembersQueryKey(chatId),
    queryFn: () => chatMembersQueryFn(chatId),
    ...options,
  });
};

export default useChatMembers;
