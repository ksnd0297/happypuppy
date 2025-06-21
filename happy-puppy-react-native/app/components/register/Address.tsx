import { useController } from "react-hook-form";
import Select from "../shared/Select";
import { REGISTER_FORM_PATH } from "@/app/constants/register/form";

const OPTION_LIST = [
  {
    label: "서울",
    value: "서울",
  },
  {
    label: "경기",
    value: "경기",
  },
  {
    label: "인천",
    value: "인천",
  },
  {
    label: "대전",
    value: "대전",
  },
  {
    label: "대구",
    value: "대구",
  },
  {
    label: "광주",
    value: "광주",
  },
  {
    label: "부산",
    value: "부산",
  },
  {
    label: "세종",
    value: "세종",
  },
  {
    label: "강원",
    value: "강원",
  },
  {
    label: "충북",
    value: "충북",
  },
  {
    label: "충남",
    value: "충남",
  },
  {
    label: "경북",
    value: "경북",
  },
  {
    label: "경남",
    value: "경남",
  },
  {
    label: "전북",
    value: "전북",
  },
  {
    label: "전남",
    value: "전남",
  },
  {
    label: "제주",
    value: "제주",
  },
];

const Address = () => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: REGISTER_FORM_PATH.ADDRESS,
    rules: {
      required: "거주지는 필수 입력입니다.",
    },
  });

  return <Select label="거주지" value={value} isError={!!error?.message} errorMessage={error?.message} essential={true} onChange={({ value }) => onChange(value)} placeholder="사는 곳을 선택해 주세요" data={OPTION_LIST} />;
};

export default Address;
