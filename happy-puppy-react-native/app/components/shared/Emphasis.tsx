import { fontFamily } from "@/app/constants/shared/font";
import { StyleSheet, Text } from "react-native";

const Emphasis = () => {
  return <Text style={styles.emphasis}>*</Text>;
};

export default Emphasis;

const styles = StyleSheet.create({
  emphasis: {
    color: "red",
    fontSize: 12,
    fontFamily,
  },
});
