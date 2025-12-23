import { useController } from "react-hook-form";
import Input from "../shared/Input";
import { REGISTER_FORM_PATH } from "@/app/constants/register/form";
import { View } from "react-native";
import Text from "../shared/Text";

const Phone = () => {
  const {
    field: { value, onChange, disabled },
  } = useController({
    name: REGISTER_FORM_PATH.PHONE,
  });

  return (
    <Input
      editable={!disabled}
      value={value}
      onChangeText={onChange}
      label={
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text medium>연락처</Text>
          <Text small gray bottom>
            [비필수] 연락처는 다른 사람에게 노출될 수 있습니다
          </Text>
        </View>
      }
      placeholder="연락처를 입력해 주세요"
      inputMode="numeric"
      maxLength={14}
    />
  );
};

export default Phone;
