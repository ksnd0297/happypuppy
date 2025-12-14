import { AgeType, Gender, Region } from "@/app/services/users/types";

export type RegisterForm = {
  nickname: string | null;
  profileImageUrl: string | null;
  gender: Gender | null;
  ageType: AgeType | null;
  address: Region | null;
  introduce: string | null;
  phoneNumber: string | null;
};

export const REGISTER_FROM_DEFAULT_VALUES = {
  profileImageUrl: null,
  phoneNumber: null,
  nickname: null,
  age: null,
  address: null,
  introduce: null,
  gender: null,
};

export const REGISTER_FORM_PATH = {
  IMAGE_URL: "profileImageUrl",
  NICKNAME: "nickname",
  PHONE: "phoneNumber",
  AGE: "age",
  ADDRESS: "address",
  INTRODUCE: "introduce",
  GENDER: "gender",
};

export const REPORT_FORM_DEFAULT_VALUES = {
  reportReason: "",
  reportText: "",
};

export const REPORT_FORM_PATH = {
  REPORT_REASON: "reportReason",
  REPORT_TEXT: "reportText",
} as const;
