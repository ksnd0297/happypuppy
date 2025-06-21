import { StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import Label, { LabelType } from "./Label";
import { fontFamily } from "@/app/constants/shared/font";

export enum InputType {
  TYPE1 = "TYPE1",
}

type Props = {
  essential?: boolean;
  inputType?: InputType;
  isError?: boolean;
  errorMessage?: string;
  label?: string;
  labelType?: LabelType;
} & TextInput["props"];

const Input = (props: Props) => {
  const { essential, inputType = InputType.TYPE1, isError, errorMessage, label, labelType = LabelType.TYPE1, ...rest } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const inputStyle = {
    ...INPUT_STYLE["DEFAULT"],
    ...INPUT_STYLE[inputType],
    ...(isFocused && INPUT_STYLE["FOCUS"]),
    ...(isError && INPUT_STYLE["ERROR"]),
  };

  return (
    <View>
      <View style={{ display: "flex", gap: 10 }}>
        <Label essential={essential} label={label} labelType={labelType} />
        <TextInput onFocus={handleFocus} onBlur={handleBlur} style={inputStyle} {...rest} />
      </View>
      <View>{isError && !!errorMessage && <Text style={{ color: "red", fontSize: 12 }}>{errorMessage}</Text>}</View>
    </View>
  );
};

export default Input;

const INPUT_STYLE = StyleSheet.create({
  DEFAULT: {
    backgroundColor: "white",
    borderColor: "#D9D9D9",
    borderRadius: 10,
    borderWidth: 0.5,
    fontSize: 15,
    minWidth: 240,
    paddingLeft: 10,
    verticalAlign: "top",
    fontFamily,
  },

  TYPE1: {
    width: 341,
    height: 45,
  },

  FOCUS: {
    borderColor: "black",
  },

  ERROR: {
    borderColor: "red",
  },
});
