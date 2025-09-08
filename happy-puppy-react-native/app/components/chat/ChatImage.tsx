import { Image, StyleSheet, View } from "react-native";

type Props = {
  chatImageUrl: string;
};

const ChatImage = (props: Props) => {
  const { chatImageUrl } = props;

  return (
    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: chatImageUrl,
        }}
        style={styles.image}
      />
    </View>
  );
};

export default ChatImage;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 0.5,
  },
  image: {
    resizeMode: "stretch",
    width: "100%",
    height: "100%",
  },
});
