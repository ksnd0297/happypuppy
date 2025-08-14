import Input, { InputType } from "../shared/Input";

const AppointmentTag = () => {
  return <Input placeholder="약속의 태그를 작성해주세요 예) #소형견 #산책" inputType={InputType.TYPE2} />;
};

export default AppointmentTag;
