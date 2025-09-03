import { Image, StyleSheet, View } from "react-native";
import Text from "../shared/Text";
import { ScrollView } from "react-native-gesture-handler";

const dogImage = require("@/app/assets/dog.png");

const ChatPeople = () => {
  return (
    <View style={styles.chatPeopleContainer}>
      <ScrollView style={styles.chatPeopleScrollContainer} contentContainerStyle={styles.chatPeopleContentContainer}>
        {[...Array(10)].map((_, i) => (
          <View key={i} style={styles.personContainer}>
            <Image source={dogImage} style={styles.personImage} />
            <Text bold>조이</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ChatPeople;

const styles = StyleSheet.create({
  chatPeopleContainer: {
    flex: 0.6,
    width: "70%",
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
    width: 40,
    height: 40,
    borderRadius: 15,
  },
});
