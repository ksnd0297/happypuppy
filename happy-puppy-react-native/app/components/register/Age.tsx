import { useController } from "react-hook-form";
import Select from "../shared/Select";
import { REGISTER_FORM_PATH } from "@/src/constants/register/form";

const OPTION_LIST = [
  {
    label: "10대",
    value: "10",
  },
  {
    label: "20대",
    value: "20",
  },
  {
    label: "30대",
    value: "30",
  },
  {
    label: "40대",
    value: "40",
  },
  {
    label: "50대",
    value: "50",
  },
  {
    label: "60대",
    value: "60",
  },
];

const Age = () => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: REGISTER_FORM_PATH.AGE,
    rules: {
      required: "연령대는 필수 입력입니다.",
    },
  });

  return <Select label="연령대" value={value} essential={true} isError={!!error?.message} errorMessage={error?.message} onChange={({ value }) => onChange(value)} placeholder="연령대를 선택해 주세요" data={OPTION_LIST} />;
};

export default Age;
