export enum ReportType {
  SPAM = "SPAM",
  INAPPROPRIATE_CONTENT = "INAPPROPRIATE_CONTENT",
  HARASSMENT = "HARASSMENT",
}

export type ReportRequest = {
  reporter: number;
  accuser: number;
  reasonType: ReportType;
  reason?: string;
};

export type ReportResponse = {
  id: number;
};
