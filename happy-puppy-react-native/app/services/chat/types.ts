export type PostChatParams = {
  userId: number;
  name: string;
  placeId: number;
  meetDate: string;
  meetTime: string;
  imageUrl?: string;
  introduce?: string;
  tags?: string[];
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
  tags?: string[];
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
