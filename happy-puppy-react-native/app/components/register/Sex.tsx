import { Gender } from "@/app/services/users/types";
import Select, { SelectType } from "../shared/Select";
import { useController } from "react-hook-form";
import { REGISTER_FORM_PATH } from "@/app/constants/register/form";

const OPTION_LIST = [
  {
    label: "남성",
    value: Gender.MALE,
  },
  {
    label: "여성",
    value: Gender.FEMALE,
  },
];

const Sex = () => {
  const {
    field: { value, onChange, disabled },
  } = useController({
    name: REGISTER_FORM_PATH.GENDER,
  });

  return <Select editable={!disabled} value={value} selectType={SelectType.TYPE2} label="성별" data={OPTION_LIST} onChange={({ value }) => onChange(value)} placeholder="성별" />;
};

export default Sex;
