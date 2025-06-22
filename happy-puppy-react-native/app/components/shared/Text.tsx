import { fontFamily } from "@/app/constants/shared/font";
import { Text as RNText, StyleSheet } from "react-native";

type Type = "small" | "medium" | "large";

type Props = {
  children: React.ReactNode;

  xxsmall?: boolean;
  xsmall?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  xlarge?: boolean;
  xxlarge?: boolean;
  xxxlarge?: boolean;

  bold?: boolean;

  gray?: boolean;
};

const Text = (props: Props) => {
  const { children } = props;

  let style = {};

  Object.entries(props).forEach(([key, value]) => {
    if (key in styles) {
      if (value) {
        style = { ...style, ...styles[key as Type], ...styles["default"] };
      }
    }
  });

  return <RNText style={style}>{children}</RNText>;
};

export default Text;

const styles = StyleSheet.create({
  default: { fontFamily },

  xxsmall: {
    fontSize: 8,
  },
  xsmall: {
    fontSize: 10,
  },
  small: {
    fontSize: 12,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 20,
  },
  xlarge: {
    fontSize: 24,
  },
  xxlarge: {
    fontSize: 28,
  },
  xxxlarge: {
    fontSize: 32,
  },

  bold: {
    fontWeight: "bold",
  },

  gray: {
    color: "#7C7C7C",
  },
});
