import { StyleSheet, TextInput, View } from "react-native";
import { useState } from "react";
import Label, { LabelType } from "./Label";
import { fontFamily } from "@/app/constants/shared/font";

export enum TextAreaType {
  TYPE1 = "TYPE1",
}

type Props = {
  essential?: boolean;
  inputType?: TextAreaType;
  isError?: boolean;
  label?: string;
  labelType?: LabelType;
} & TextInput["props"];

const Textarea = (props: Props) => {
  const { essential, inputType = TextAreaType.TYPE1, isError, label, labelType = LabelType.TYPE1, ...rest } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const textAreaStyle = {
    ...TEXTAREA_STYLE["DEFAULT"],
    ...TEXTAREA_STYLE[inputType],
    ...(isFocused && TEXTAREA_STYLE["FOCUS"]),
    ...(isError && TEXTAREA_STYLE["ERROR"]),
  };

  return (
    <>
      <View style={{ display: "flex", gap: 10 }}>
        <Label essential={essential} label={label} labelType={labelType} />
        <TextInput onFocus={handleFocus} onBlur={handleBlur} style={textAreaStyle} {...rest} multiline={true} />
      </View>
    </>
  );
};

export default Textarea;

const TEXTAREA_STYLE = StyleSheet.create({
  DEFAULT: {
    backgroundColor: "white",
    borderColor: "#D9D9D9",
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 15,
    minWidth: 240,
    paddingLeft: 10,
    verticalAlign: "top",
    fontFamily,
  },

  TYPE1: {
    width: 341,
    height: 80,
  },

  FOCUS: {
    borderColor: "black",
  },

  ERROR: {
    borderColor: "red",
  },
});
