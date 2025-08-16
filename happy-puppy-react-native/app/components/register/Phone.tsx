import { useController } from "react-hook-form";
import Input from "../shared/Input";
import { REGISTER_FORM_PATH } from "@/app/constants/register/form";

const Phone = () => {
  const {
    field: { value, onChange },
  } = useController({
    name: REGISTER_FORM_PATH.PHONE,
  });

  return <Input value={value} onChangeText={onChange} label="연락처" placeholder="연락처를 입력해 주세요" inputMode="numeric" />;
};

export default Phone;
