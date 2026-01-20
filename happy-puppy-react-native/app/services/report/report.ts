import { API_HOST } from "../host";
import { ReportRequest, ReportResponse } from "./types";
import { api } from "@/app/utils/api";

export function postReport(params: ReportRequest): Promise<ReportResponse> {
  return api.post(`${API_HOST}/report`, params);
}
