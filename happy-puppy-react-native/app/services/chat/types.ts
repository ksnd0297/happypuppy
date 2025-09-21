export type PostChatParams = {
  userId: number;
  name: string;
  placeId: number;
  meetDate: string;
  meetTime: string;
  imageUrl?: string;
  introduce?: string;
  tags?: string;
};

export type CreateChatResponse = {
  chatId: number;
};

export type ChatJoinParams = {
  chatId: number;
  userId: number;
};

export type ChatLeaveParams = ChatJoinParams;

export type GetMyChatParams = {
  userId: number;
};

enum ChatStatus {
  ON = "ON",
  OFF = "OFF",
}

export type ChatResponse = {
  id: number;
  status: ChatStatus;
  name: string;
  meetDate: string;
  meetTime: string;
  meetAt: string;
  imageUrl?: string;
  introduce?: string;
  tags?: string;
};
export type GetChatsParams = {
  placeId: number;
};

export type GetChatMembersParams = {
  chatId: number;
};

export type ChatMemberResponse = {
  id: number;
  status: "JOINED" | "LEFT" | "KICKED";
  chatId: number;
  userId: number;
  profileImageUrl?: string;
  // TODO : 필수 필드 교체 요청
  nickname?: string;
  owner: boolean;
  createdAt: boolean;
};

export type GetChatDetailParams = {
  chatId: number;
};

enum Status {
  ON = "ON",
  OFF = "OFF",
}

enum PlaceType {
  PARK = "PARK",
  HOSPITAL = "HOSPITAL",
  PHARMACY = "PHARMACY",
  CULTURE_CENTER = "CULTURE_CENTER",
  ART_MUSEUM = "ART_MUSEUM",
  BEAUTY = "BEAUTY",
  MUSEUM = "MUSEUM",
  SUPPLIES = "SUPPLIES",
  RESTAURANT = "RESTAURANT",
  TRAVEL = "TRAVEL",
  ENTRUST_MANAGEMENT = "ENTRUST_MANAGEMENT",
  CAFE = "CAFE",
}

export enum KORPlaceType {
  PARK = "공원",
  HOSPITAL = "병원",
  PHARMACY = "약국",
  CULTURE_CENTER = "문화센터",
  ART_MUSEUM = "미술관",
  BEAUTY = "뷰티샵 / 미용",
  MUSEUM = "박물관",
  SUPPLIES = "용품점 / 상점",
  RESTAURANT = "음식점",
  TRAVEL = "여행사 / 관광",
  ENTRUST_MANAGEMENT = "위탁 관리",
  CAFE = "카페",
}

export type ChatDetailResponse = {
  chatId: number;
  status: Status;
  name: string;
  meetDate: string;
  meetTime: string;
  imageUrl?: string;
  introduce?: string;
  tags?: string;
  placeId: number;
  placeName?: string;
  placeType: PlaceType;
  address?: string;
  // TODO : roadAddress 아닌지 확인 필요
  readAddress?: string;
  latitude?: string;
  longitude?: string;
  contact?: string;
  homepage?: string;
  offDays?: string;
  operationTime?: string;
};
