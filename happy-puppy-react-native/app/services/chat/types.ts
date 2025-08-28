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
