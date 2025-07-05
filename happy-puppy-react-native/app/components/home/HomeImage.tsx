import { Image, StyleSheet, View } from "react-native";
import Label from "../shared/Label";

type Props = {
  title: string;
  uri: string;
};

const HomeImage = (props: Props) => {
  const { title, uri } = props;

  return (
    <>
      <View style={styles.imageContainer}>
        <Image source={{ uri }} style={styles.image} />
      </View>
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
