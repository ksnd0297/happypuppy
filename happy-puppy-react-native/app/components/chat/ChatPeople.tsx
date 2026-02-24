import { Image, Pressable, StyleSheet, View } from "react-native";
import Text from "../shared/Text";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@/app/RootStack";
import { ChatMemberResponse } from "@/app/services/chat/types";

type Props = {
  memberList?: ChatMemberResponse[];
};

const defaultImage = require("@/app/assets/default.png");

const ChatPeople = (props: Props) => {
  const { memberList } = props;

  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View style={styles.chatPeopleContainer}>
      <ScrollView style={styles.chatPeopleScrollContainer} contentContainerStyle={styles.chatPeopleContentContainer}>
        {memberList?.map((member, index) => (
          <Pressable
            key={index}
            style={styles.personContainer}
            onPress={() => navigation.navigate("Register", { id: member.userId })}
          >
            <Image
              source={
                member.profileImageUrl
                  ? {
                      uri: member.profileImageUrl,
                    }
                  : defaultImage
              }
              style={styles.personImage}
            />
            <Text bold>{member.nickname}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default ChatPeople;

const styles = StyleSheet.create({
  chatPeopleContainer: {
    flex: 0.6,
    width: "90%",
    borderRadius: 15,
    backgroundColor: "#FBE8E7",
    padding: 20,
  },

  chatPeopleScrollContainer: {
    flex: 1,
  },

  chatPeopleContentContainer: {
    gap: 15,
  },

  personContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  personImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
