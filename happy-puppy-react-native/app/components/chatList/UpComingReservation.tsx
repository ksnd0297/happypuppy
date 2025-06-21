import { Image, StyleSheet, View } from "react-native";
import Text from "../shared/Text";

type Props = {
  imageUri: string;
  title: string;
  dateTime: string;
};

const UpComingReservation = (props: Props) => {
  const { imageUri, title, dateTime } = props;

  return (
    <View style={styles.upComingReservation}>
      <Image
        source={{
          uri: imageUri,
        }}
        style={styles.image}
      />
      <View style={styles.textContentWrapper}>
        <Text small bold>
          {title}
        </Text>
        <Text xsmall bold gray>
          {dateTime}
        </Text>
      </View>
    </View>
  );
};

export default UpComingReservation;

const styles = StyleSheet.create({
  upComingReservation: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    gap: 5,
  },

  image: {
    height: 70,
    width: 70,
    borderRadius: 50,
    borderWidth: 1,
  },

  textContentWrapper: {
    flex: 1,
    alignItems: "center",
  },
});
