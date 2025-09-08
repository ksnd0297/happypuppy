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

export enum AgeType {
  TEENS = "TEENS",
  TWENTIES = "TWENTIES",
  THIRTIES = "THIRTIES",
  FORTIES = "FORTIES",
  FIFTIES = "FIFTIES",
  SIXTIES = "SIXTIES",
}

export type UserRegisterRequest = {
  address?: Region;
  ageType?: AgeType;
  appUserId: number;
  gender?: Gender;
  introduce?: string;
  nickname: string;
  phoneNumber?: string;
  profileImageUrl: string;
  showPhoneNumber?: boolean;
};

export type UserResponse = {
  address?: Region;
  ageType?: AgeType;
  appUserId: number;
  gender?: Gender;
  id: number;
  introduce?: string;
  nickname: string;
  phoneNumber?: string;
  profileImageUrl: string;
  showPhoneNumber?: boolean;
};

export type GetUsersParams = {
  id: number;
};

export type GetUsersCheckParams = {
  appUserId: number;
};

export type UserCheckResponse = {
  userId: number;
  isMember: boolean;
};

export type UpdateUserRequest = {
  id: number;
  // TODO : 필드 수정 필요
  params: {
    nickname: string;
    profileImageUrl?: string;
    age?: number;
    address?: Region;
    ageType?: AgeType;
    gender?: Gender;
    introduce: string;
    phoneNumber?: string;
    showPhoneNumber?: boolean;
  };
};
