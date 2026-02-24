import { Image, Pressable, StyleSheet } from "react-native";
import Label from "../shared/Label";

type Props = {
  title: string;
  uri: string;
  handlePress: () => void;
};

const defaultImage = require("@/app/assets/default.png");

const HomeImage = (props: Props) => {
  const { title, uri, handlePress } = props;

  return (
    <>
      <Pressable style={styles.imageContainer} onPress={handlePress}>
        <Image source={uri ? { uri: uri } : defaultImage} style={styles.image} />
      </Pressable>
      <Label label={title} />
    </>
  );
};

export default HomeImage;

const styles = StyleSheet.create({
  imageContainer: {
    width: 160,
    height: 160,
    borderRadius: 100,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
