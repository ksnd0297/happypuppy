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

const DUMMY_CHAT = [
  {
    id: 1,
    status: "ON",
    name: "동천역 강아지 산책",
    meetDate: "2025-12-03",
    meetTime: "14:00:00",
    meetAt: "2025-12-03T14:00:00",
    introduce: "동천역 앞 탄천에서 저녁에 소형, 중형견 산책하실 견주 분 구해요! 저희 진돗개랑 친구해요 ~",
    tags: "#산책 #소형견 #중형견 #반려견 #동천 #강아지",
  },
  {
    id: 1,
    status: "ON",
    name: "동천역 강아지 산책",
    meetDate: "2025-12-03",
    meetTime: "14:00:00",
    meetAt: "2025-12-03T14:00:00",
    introduce: "동천역 앞 탄천에서 저녁에 소형, 중형견 산책하실 견주 분 구해요! 저희 진돗개랑 친구해요 ~",
    tags: "#산책 #소형견 #중형견 #반려견 #동천 #강아지",
  },
  {
    id: 1,
    status: "ON",
    name: "동천역 강아지 산책",
    meetDate: "2025-12-03",
    meetTime: "14:00:00",
    meetAt: "2025-12-03T14:00:00",
    introduce: "동천역 앞 탄천에서 저녁에 소형, 중형견 산책하실 견주 분 구해요! 저희 진돗개랑 친구해요 ~",
    tags: "#산책 #소형견 #중형견 #반려견 #동천 #강아지",
  },
  {
    id: 1,
    status: "ON",
    name: "동천역 강아지 산책",
    meetDate: "2025-12-03",
    meetTime: "14:00:00",
    meetAt: "2025-12-03T14:00:00",
    introduce: "동천역 앞 탄천에서 저녁에 소형, 중형견 산책하실 견주 분 구해요! 저희 진돗개랑 친구해요 ~",
    tags: "#산책 #소형견 #중형견 #반려견 #동천 #강아지",
  },
  {
    id: 1,
    status: "ON",
    name: "동천역 강아지 산책",
    meetDate: "2025-12-03",
    meetTime: "14:00:00",
    meetAt: "2025-12-03T14:00:00",
    introduce: "동천역 앞 탄천에서 저녁에 소형, 중형견 산책하실 견주 분 구해요! 저희 진돗개랑 친구해요 ~",
    tags: "#산책 #소형견 #중형견 #반려견 #동천 #강아지",
  },
  {
    id: 1,
    status: "ON",
    name: "동천역 강아지 산책",
    meetDate: "2025-12-03",
    meetTime: "14:00:00",
    meetAt: "2025-12-03T14:00:00",
    introduce: "동천역 앞 탄천에서 저녁에 소형, 중형견 산책하실 견주 분 구해요! 저희 진돗개랑 친구해요 ~",
    tags: "#산책 #소형견 #중형견 #반려견 #동천 #강아지",
  },
  {
    id: 1,
    status: "ON",
    name: "동천역 강아지 산책",
    meetDate: "2025-12-03",
    meetTime: "14:00:00",
    meetAt: "2025-12-03T14:00:00",
    introduce: "동천역 앞 탄천에서 저녁에 소형, 중형견 산책하실 견주 분 구해요! 저희 진돗개랑 친구해요 ~",
    tags: "#산책 #소형견 #중형견 #반려견 #동천 #강아지",
  },
  {
    id: 1,
    status: "ON",
    name: "동천역 강아지 산책",
    meetDate: "2025-12-03",
    meetTime: "14:00:00",
    meetAt: "2025-12-03T14:00:00",
    introduce: "동천역 앞 탄천에서 저녁에 소형, 중형견 산책하실 견주 분 구해요! 저희 진돗개랑 친구해요 ~",
    tags: "#산책 #소형견 #중형견 #반려견 #동천 #강아지",
  },
];

const useMyChat = (props: Props) => {
  const { userId, options } = props;

  return useQuery({
    queryKey: myChatQueryKey(userId),
    queryFn: () => {
      return DUMMY_CHAT;
    },
    ...options,
  });
};

export default useMyChat;
