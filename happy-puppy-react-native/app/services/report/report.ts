import { API_HOST } from "../host";
import { ReportRequest, ReportResponse } from "./types";
import { api } from "@/app/utils/api";

export function postReport(params: ReportRequest): Promise<ReportResponse> {
  console.log("params. :", params);
  return api.post(`${API_HOST}/report`, params);
}
