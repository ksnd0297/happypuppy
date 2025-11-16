import { ReportType } from "@/app/services/report/types";

export const isReportReason = (value: string): value is ReportType => {
  return Object.values(ReportType).some((type) => type === value);
};
