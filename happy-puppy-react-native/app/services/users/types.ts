export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum Region {
  SEOUL = "SEOUL",
  INCHEON = "INCHEON",
  DAEJEON = "DAEJEON",
  DAEGU = "DAEGU",
  GWANGJU = "GWANGJU",
  BUSAN = "BUSAN",
  ULSAN = "ULSAN",
  SEJONG = "SEJONG",
  GYEONGGI = "GYEONGGI",
  GANGWON = "GANGWON",
  CHUNGBUK = "CHUNGBUK",
  CHUNGNAM = "CHUNGNAM",
  GYEONGBUK = "GYEONGBUK",
  GYEONGNAM = "GYEONGNAM",
  JEONBUK = "JEONBUK",
  JEONNAM = "JEONNAM",
  JEJU = "JEJU",
}

export type UserRegisterRequest = {
  nickname: string;
  profileImageUrl: string;
  gender: Gender;
  age: number;
  address: Region;
  introduce: string;
};

export type UserResponse = {
  id: number;
  nickname: string;
  gender: Gender;
};

export type GetUsersParams = {
  id: number;
};

export type GetUsersCheckParams = {
  appUserId: number;
};

export type UserCheckResponse = {
  isMember: boolean;
};
