import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from "../../shared/Text";
import { RouteId } from "@/app/types/route";

type Props = {
  roomId: string;
  imageUri: string;
  title: string;
  dateTime: string;
  handleEnterChat: (roomId: RouteId) => void;
};

const UpComingReservation = (props: Props) => {
  const { roomId, imageUri, title, dateTime, handleEnterChat } = props;

  return (
    <Pressable onPress={() => handleEnterChat(roomId)}>
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
    </Pressable>
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
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 1,
  },

  textContentWrapper: {
    flex: 1,
    alignItems: "center",
  },
});
