import { REGISTER_MODE } from "@/app/enums/register";
import { useNavigation } from "@react-navigation/native";
import Button, { ButtonType } from "../shared/Button";

type Props = {
  disabled: boolean;
  mode: REGISTER_MODE;
  handleClick: () => void;
};

const RegisterButton = (props: Props) => {
  const { disabled, mode, handleClick } = props;

  const navigation = useNavigation();

  if (mode === REGISTER_MODE.REGISTER) {
    return (
      <Button buttonType={ButtonType.TYPE1} onPress={handleClick} disabled={disabled}>
        입장하기
      </Button>
    );
  }

  if (mode === REGISTER_MODE.EDIT) {
    return (
      <>
        <Button small buttonType={ButtonType.TYPE2} onPress={() => navigation.goBack()}>
          뒤로가기
        </Button>
        <Button small buttonType={ButtonType.TYPE1} onPress={handleClick} disabled={disabled}>
          수정하기
        </Button>
      </>
    );
  }

  if (mode === REGISTER_MODE.VIEW) {
    return (
      <>
        <Button small buttonType={ButtonType.TYPE1} onPress={navigation.goBack}>
          뒤로가기
        </Button>
        <Button small buttonType={ButtonType.TYPE2} onPress={handleClick} disabled={disabled}>
          신고하기
        </Button>
      </>
    );
  }
};

export default RegisterButton;
