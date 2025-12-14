export enum MaintenanceStatus {
  ON = "ON",
  OFF = "OFF",
}

export type MaintenanceResponse = {
  status: MaintenanceStatus;
  startDateTime: string;
  endDateTime: string;
};

export type VersionResponse = {
  version: string;
};
