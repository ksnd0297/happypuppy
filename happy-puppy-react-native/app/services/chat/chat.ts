import { ChatJoinParams, ChatLeaveParams, ChatMemberResponse, ChatResponse, CreateChatResponse, GetChatMembersParams, GetChatsParams, GetMyChatParams, PostChatParams } from "./types";
import { api } from "@/app/utils/api";

export function postChat(params: PostChatParams): Promise<CreateChatResponse> {
  return api.post(`http://localhost:8080/chat`, params);
}

export function chatJoin(params: ChatJoinParams): Promise<boolean> {
  return api.post(`http://localhost:8080/chat/join`, params);
}

export function chatLeave(params: ChatLeaveParams): Promise<boolean> {
  return api.post(`http://localhost:8080/chat/leave`, params);
}

export function getMyChat(params: GetMyChatParams): Promise<ChatResponse[]> {
  return api.get(`http://localhost:8080/chat/my`, { params });
}

export function getChats(params: GetChatsParams): Promise<ChatResponse[]> {
  return api.get(`http://localhost:8080/chats`, { params });
}

export function getChatMembers(params: GetChatMembersParams): Promise<ChatMemberResponse[]> {
  return api.get(`http://localhost:8000/chat/${params.chatId}/member`);
}
