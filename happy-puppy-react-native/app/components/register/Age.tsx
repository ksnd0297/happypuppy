import { useController } from "react-hook-form";
import Select, { SelectType } from "../shared/Select";
import { REGISTER_FORM_PATH } from "@/app/constants/register/form";
import { AgeType } from "@/app/services/users/types";

const OPTION_LIST = [
  {
    label: "10대",
    value: AgeType.TEENS,
  },
  {
    label: "20대",
    value: AgeType.TWENTIES,
  },
  {
    label: "30대",
    value: AgeType.THIRTIES,
  },
  {
    label: "40대",
    value: AgeType.FORTIES,
  },
  {
    label: "50대",
    value: AgeType.FIFTIES,
  },
  {
    label: "60대",
    value: AgeType.SIXTIES,
  },
];

const Age = () => {
  const {
    field: { value, onChange, disabled },
  } = useController({
    name: REGISTER_FORM_PATH.AGE,
  });

  return <Select editable={!disabled} selectType={SelectType.TYPE3} label="연령대" value={value} onChange={({ value }) => onChange(value)} placeholder="연령대를 선택해 주세요" data={OPTION_LIST} />;
};

export default Age;
