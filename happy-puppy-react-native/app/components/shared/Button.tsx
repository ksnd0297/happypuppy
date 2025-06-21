import { fontFamily } from "@/app/constants/shared/font";
import { Pressable, StyleSheet, Text } from "react-native";

export enum ButtonType {
  TYPE1 = "TYPE1",
}

type Props = {
  children?: React.ReactNode;
  buttonType?: ButtonType;
  disabled?: boolean;
  onPress?: () => void;
};

const Button = (props: Props) => {
  const { children, buttonType = ButtonType.TYPE1, disabled, onPress } = props;

  const buttonStyle = {
    ...BUTTON_STYLE["DEFAULT"],
    ...BUTTON_STYLE[buttonType],
    ...(disabled && BUTTON_STYLE["DISABLED"]),
  };

  return (
    <Pressable style={buttonStyle} onPress={onPress} disabled={disabled}>
      <Text style={BUTTON_STYLE["TEXT"]}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const BUTTON_STYLE = StyleSheet.create({
  DEFAULT: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  TYPE1: {
    width: 211,
    height: 55,
    backgroundColor: "#F7DDDE",
  },

  DISABLED: {
    backgroundColor: "#e5e5e5",
  },

  TEXT: {
    fontFamily,
    fontSize: 16,
  },
});
