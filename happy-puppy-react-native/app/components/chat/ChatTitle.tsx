import { StyleSheet, View } from "react-native";
import Text from "../shared/Text";
import { ChatDetailResponse, KORPlaceType } from "@/app/services/chat/types";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

type Props = {
  chatInfo?: ChatDetailResponse;
};

const ChatTitle = (props: Props) => {
  const { chatInfo } = props;

  const placeName = chatInfo?.placeName;
  const meetDateTime = chatInfo ? format(new Date(`${chatInfo?.meetDate}T${chatInfo?.meetTime}`), "yy. MM. dd. (E) HH:MM", { locale: ko }) : "";

  return (
    <View style={styles.chatTitleContainer}>
      <View style={styles.title}>
        <Text large bold>
          {chatInfo?.name}{" "}
        </Text>
        <Text small bold gray bottom>
          {chatInfo?.placeType && KORPlaceType[chatInfo.placeType]}
        </Text>
      </View>
      <Text small bold>
        {chatInfo?.readAddress}
      </Text>
      <View>
        <Text small gray>
          {`${placeName} · ${meetDateTime}`}
        </Text>
      </View>
    </View>
  );
};

export default ChatTitle;

const styles = StyleSheet.create({
  chatTitleContainer: {
    width: "100%",
    gap: 5,
  },

  title: {
    flexDirection: "row",
  },
});
