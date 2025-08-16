import { StyleSheet, Text, View } from "react-native";
import Label, { LabelProps } from "./Label";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import { useState } from "react";
import { fontFamily } from "@/app/constants/shared/font";

type OptionType = {
  label: string;
  value: string;
};

export enum SelectType {
  TYPE1 = "TYPE1",
  TYPE2 = "TYPE2",
  TYPE3 = "TYPE3",
}

type Props = {
  isError?: boolean;
  errorMessage?: string;
  selectType: SelectType;
} & LabelProps &
  Omit<DropdownProps<OptionType>, "labelField" | "valueField">;

const Select = (props: Props) => {
  const { essential, selectType, isError, errorMessage, label, labelType, value, ...rest } = props;

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isSelected = !!value;

  const selectStyle = {
    ...SELECT_STYLE["DEFAULT"],
    ...SELECT_STYLE[selectType],
    ...(isSelected && SELECT_STYLE["SELECTED"]),
    ...(isFocused && SELECT_STYLE["FOCUS"]),
    ...(isError && SELECT_STYLE["ERROR"]),
  };

  return (
    <View>
      <View style={{ display: "flex", gap: 10 }}>
        <Label essential={essential} label={label} labelType={labelType} />
        <Dropdown
          style={selectStyle}
          selectedTextStyle={SELECT_STYLE["OPTION"]}
          itemTextStyle={SELECT_STYLE["OPTION"]}
          placeholderStyle={SELECT_STYLE["PLACEHOLDER"]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          {...rest}
          labelField="label"
          valueField="value"
          dropdownPosition="top"
        />
      </View>
      <View>{isError && !!errorMessage && <Text style={{ color: "red", fontSize: 12 }}>{errorMessage}</Text>}</View>
    </View>
  );
};

export default Select;

const SELECT_STYLE = StyleSheet.create({
  DEFAULT: {
    backgroundColor: "white",
    borderColor: "#D9D9D9",
    borderRadius: 10,
    borderWidth: 0.5,
    fontSize: 15,

    paddingLeft: 10,
    paddingRight: 10,

    fontFamily,
  },

  TYPE1: {
    width: 341,
    height: 45,
  },

  TYPE2: {
    width: 100,
    height: 45,
  },

  TYPE3: {
    width: 241,
    height: 45,
  },

  OPTION: {
    fontSize: 15,
    fontFamily,
  },

  PLACEHOLDER: {
    color: "#858585",
    fontSize: 15,
    fontFamily,
  },

  SELECTED: {
    borderColor: "black",
  },

  FOCUS: {
    borderColor: "black",
  },

  ERROR: {
    borderColor: "red",
  },
});
