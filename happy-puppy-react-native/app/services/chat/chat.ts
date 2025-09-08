import axios, { AxiosResponse } from "axios";
import { ChatJoinParams, ChatLeaveParams, ChatMemberResponse, ChatResponse, CreateChatResponse, GetChatMembersParams, GetChatsParams, GetMyChatParams, PostChatParams } from "./types";

export function postChat(params: PostChatParams): Promise<AxiosResponse<CreateChatResponse>> {
  return axios.post<CreateChatResponse>(`http://localhost:8080/chat`, params);
}

export function chatJoin(params: ChatJoinParams): Promise<AxiosResponse<boolean>> {
  return axios.post<boolean>(`http://localhost:8080/chat/join`, params);
}

export function chatLeave(params: ChatLeaveParams): Promise<AxiosResponse<boolean>> {
  return axios.post<boolean>(`http://localhost:8080/chat/leave`, params);
}

export function getMyChat(params: GetMyChatParams): Promise<AxiosResponse<ChatResponse[]>> {
  return axios.get<ChatResponse[]>(`http://localhost:8080/chat/my`, { params });
}

export function getChats(params: GetChatsParams): Promise<AxiosResponse<ChatResponse[]>> {
  return axios.get<ChatResponse[]>(`http://localhost:8080/chats`, { params });
}

export function getChatMembers(params: GetChatMembersParams): Promise<AxiosResponse<ChatMemberResponse[]>> {
  return axios.get<ChatMemberResponse[]>(`http://localhost:8000/chat/${params.chatId}/member`);
}
