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
