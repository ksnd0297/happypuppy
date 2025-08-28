import Textarea, { TextAreaType } from "../shared/Textarea";

const AppointmentIntroduce = () => {
  return <Textarea value="" inputType={TextAreaType.TYPE2} placeholder="약속을 소개하는 글을 작성해주세요" />;
};

export default AppointmentIntroduce;
