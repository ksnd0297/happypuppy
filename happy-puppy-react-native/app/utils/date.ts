import { format as formatting } from "date-fns";

export function formatTime(date: string) {
  const d = new Date(date);
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export enum Format {
  "yyyy-MM-dd" = "yyyy-MM-dd",
  "yyyy년 MM월 dd일 hh시 mm분" = "yyyy년 MM월 dd일 hh시 mm분",
}

export function format(date: string, f: Format) {
  const d = new Date(date);

  return formatting(d, f);
}
