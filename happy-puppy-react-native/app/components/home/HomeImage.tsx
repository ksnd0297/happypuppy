import { Image, Pressable, StyleSheet } from "react-native";
import Label from "../shared/Label";

type Props = {
  title: string;
  uri: string;
  handlePress: () => void;
};

const HomeImage = (props: Props) => {
  const { title, uri, handlePress } = props;

  return (
    <>
      <Pressable style={styles.imageContainer} onPress={handlePress}>
        <Image source={{ uri }} style={styles.image} />
      </Pressable>
      <Label label={title} />
    </>
  );
};

export default HomeImage;

const styles = StyleSheet.create({
  imageContainer: {
    width: 200,
    height: 200,
    borderWidth: 0.5,
    borderColor: "#D9D9D9",
    borderRadius: 100,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
});
