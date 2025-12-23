import { StyleSheet, Text } from "react-native";
import Emphasis from "./Emphasis";
import { fontFamily } from "@/app/constants/shared/font";

export enum LabelType {
  TYPE1 = "TYPE1",
}

export type LabelProps = {
  essential?: boolean;
  label?: string | React.ReactNode;
  labelType?: LabelType;
};

const Label = (props: LabelProps) => {
  const { essential, label, labelType = LabelType.TYPE1 } = props;

  const labelStyle = {
    ...LABEL_STYLE["DEFAULT"],
    ...LABEL_STYLE[labelType],
  };

  return (
    <>
      {label && (
        <Text style={labelStyle}>
          {label} {essential && <Emphasis />}
        </Text>
      )}
    </>
  );
};

export default Label;

const LABEL_STYLE = StyleSheet.create({
  DEFAULT: {
    fontFamily,
  },

  TYPE1: {
    fontSize: 16,
  },
});
