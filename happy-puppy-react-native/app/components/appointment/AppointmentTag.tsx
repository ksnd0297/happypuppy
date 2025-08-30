import { useController } from "react-hook-form";
import Input, { InputType } from "../shared/Input";
import { APPOINTMENT_FORM_PATH } from "@/app/constants/appointment/form";

const AppointmentTag = () => {
  const {
    field: { value, onChange },
  } = useController({
    name: APPOINTMENT_FORM_PATH.TAG,
  });

  return <Input value={value} onChangeText={onChange} placeholder="약속의 태그를 작성해주세요 예) #소형견 #산책" inputType={InputType.TYPE2} />;
};

export default AppointmentTag;
