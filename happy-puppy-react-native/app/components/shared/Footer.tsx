import { StyleSheet, View } from "react-native";
import Icon from "./Icon";
import Text from "./Text";

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerWrapper}>
        <Icon source={require("@/app/assets/icon/bottom-pin.png")}>
          <Text small bold>
            지도
          </Text>
        </Icon>
        <Icon source={require("@/app/assets/icon/bottom-message.png")}>
          <Text small bold>
            채팅
          </Text>
        </Icon>
        <Icon source={require("@/app/assets/icon/bottom-user.png")}>
          <Text small bold>
            마이
          </Text>
        </Icon>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerContainer: {
    flex: 0.1,
  },
  footerWrapper: {
    flex: 1,

    backgroundColor: "#FBE8E7",

    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    paddingLeft: 50,
    paddingRight: 50,
  },
});
