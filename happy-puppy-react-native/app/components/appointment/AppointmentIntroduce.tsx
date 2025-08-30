import { useController } from "react-hook-form";
import Textarea, { TextAreaType } from "../shared/Textarea";
import { APPOINTMENT_FORM_PATH } from "@/app/constants/appointment/form";

const AppointmentIntroduce = () => {
  const {
    field: { value, onChange },
  } = useController({
    name: APPOINTMENT_FORM_PATH.INTRODUCE,
  });

  return <Textarea value={value} onChangeText={onChange} inputType={TextAreaType.TYPE2} placeholder="약속을 소개하는 글을 작성해주세요" />;
};

export default AppointmentIntroduce;
