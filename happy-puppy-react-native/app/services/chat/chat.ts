import axios, { AxiosResponse } from "axios";
import { CreateChatResponse, PostChatParams } from "./types";

export function postChat(params: PostChatParams): Promise<AxiosResponse<CreateChatResponse>> {
  return axios.post<CreateChatResponse>(`http://localhost:8080/chat`, params);
}
