import { API_HOST } from "../host";
import { ChatDetailResponse, ChatJoinParams, ChatLeaveParams, ChatMemberResponse, ChatResponse, CreateChatResponse, GetChatDetailParams, GetChatMembersParams, GetChatsParams, GetMyChatParams, PostChatParams } from "./types";
import { api } from "@/app/utils/api";

export function postChat(params: PostChatParams): Promise<CreateChatResponse> {
  return api.post(`${API_HOST}/chat`, params);
}

export function chatJoin(params: ChatJoinParams): Promise<boolean> {
  return api.post(`${API_HOST}/chat/join`, params);
}

export function chatLeave(params: ChatLeaveParams): Promise<boolean> {
  return api.post(`${API_HOST}/chat/leave`, params);
}

export function getMyChat(params: GetMyChatParams): Promise<ChatResponse[]> {
  return api.get(`${API_HOST}/chat/my`, { params });
}

export function getChats(params: GetChatsParams): Promise<ChatResponse[]> {
  return api.get(`${API_HOST}/chats`, { params });
}

export async function getChatMembers(params: GetChatMembersParams): Promise<ChatMemberResponse[]> {
  return api.get(`${API_HOST}/chat/${params.chatId}/members`);
}

export function getChatDetail(params: GetChatDetailParams): Promise<ChatDetailResponse> {
  return api.get(`${API_HOST}/chats/${params.chatId}`);
}
