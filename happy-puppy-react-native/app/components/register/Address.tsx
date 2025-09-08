import { useController } from "react-hook-form";
import Select, { SelectType } from "../shared/Select";
import { REGISTER_FORM_PATH } from "@/app/constants/register/form";
import { Region } from "@/app/services/users/types";

const OPTION_LIST = [
  {
    label: "서울",
    value: Region.SEOUL,
  },
  {
    label: "경기",
    value: Region.GYEONGGI,
  },
  {
    label: "인천",
    value: Region.INCHEON,
  },
  {
    label: "대전",
    value: Region.DAEJEON,
  },
  {
    label: "대구",
    value: Region.DAEGU,
  },
  {
    label: "광주",
    value: Region.GWANGJU,
  },
  {
    label: "부산",
    value: Region.BUSAN,
  },
  {
    label: "세종",
    value: Region.SEJONG,
  },
  {
    label: "강원",
    value: Region.GANGWON,
  },
  {
    label: "충북",
    value: Region.CHUNGBUK,
  },
  {
    label: "충남",
    value: Region.CHUNGNAM,
  },
  {
    label: "경북",
    value: Region.GYEONGBUK,
  },
  {
    label: "경남",
    value: Region.GYEONGNAM,
  },
  {
    label: "전북",
    value: Region.JEONBUK,
  },
  {
    label: "전남",
    value: Region.JEONNAM,
  },
  {
    label: "제주",
    value: Region.JEJU,
  },
];

const Address = () => {
  const {
    field: { value, onChange, disabled },
    fieldState: { error },
  } = useController({
    name: REGISTER_FORM_PATH.ADDRESS,
  });

  return (
    <Select editable={!disabled} selectType={SelectType.TYPE1} label="거주지" value={value} isError={!!error?.message} errorMessage={error?.message} onChange={({ value }) => onChange(value)} placeholder="사는 곳을 선택해 주세요" data={OPTION_LIST} />
  );
};

export default Address;
