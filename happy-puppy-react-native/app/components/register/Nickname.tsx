import { useController } from "react-hook-form";
import Input from "../shared/Input";
import { REGISTER_FORM_PATH } from "@/src/constants/register/form";

const MIN_LENGTH = 2;
const MAX_LENGTH = 10;

const Nickname = () => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: REGISTER_FORM_PATH.NICKNAME,
    rules: {
      required: "닉네임은 필수 입력입니다.",
      minLength: {
        value: MIN_LENGTH,
        message: `닉네임은 최소 ${MIN_LENGTH}자 이상이어야 합니다.`,
      },
      maxLength: {
        value: MAX_LENGTH,
        message: `닉네임은 최대 ${MAX_LENGTH}자 이하여야 합니다.`,
      },
    },
  });

  return <Input label="닉네임" isError={!!error?.message} errorMessage={error?.message} value={value} onChangeText={onChange} maxLength={MAX_LENGTH} essential={true} placeholder="행복한 리트리버" />;
};

export default Nickname;
