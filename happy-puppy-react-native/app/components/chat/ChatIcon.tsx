import { Image, ImageSourcePropType, Pressable, StyleSheet, View } from "react-native";

type Props = {
  source: ImageSourcePropType;
  handleClickIcon?: () => void;
};

const ChatIcon = (props: Props) => {
  const { source, handleClickIcon } = props;

  return (
    <Pressable onPress={handleClickIcon}>
      <View style={styles.iconArea}>
        <View style={styles.iconWrapper}>
          <Image source={source} />
        </View>
      </View>
    </Pressable>
  );
};

export default ChatIcon;

const styles = StyleSheet.create({
  iconArea: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    borderRadius: 50,

    width: 33,
    height: 33,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FBE8E7",
  },
});
