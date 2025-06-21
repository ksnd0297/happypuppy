import { useController } from "react-hook-form";
import Textarea from "../shared/Textarea";
import { REGISTER_FORM_PATH } from "@/src/constants/register/form";

const MAX_LENGTH = 20;

const Introduce = () => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: REGISTER_FORM_PATH.INTRODUCE,
    rules: {
      maxLength: {
        value: MAX_LENGTH,
        message: `한 줄 소개는 최대 ${MAX_LENGTH}자 이하여야 합니다.`,
      },
    },
  });

  return <Textarea value={value} onChangeText={onChange} isError={!!error?.message} label="한 줄 소개" placeholder="나는 리트리버를 키우는 애견인이에요." maxLength={20} />;
};

export default Introduce;
