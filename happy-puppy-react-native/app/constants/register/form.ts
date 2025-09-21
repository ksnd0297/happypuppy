export const REGISTER_FROM_DEFAULT_VALUES = {
  profileImageUrl: "",
  phone: "",
  nickname: "",
  age: "",
  address: "",
  introduce: "",
  gender: "",
};

export const REGISTER_FORM_PATH = {
  IMAGE_URL: "profileImageUrl",
  NICKNAME: "nickname",
  PHONE: "phone",
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
