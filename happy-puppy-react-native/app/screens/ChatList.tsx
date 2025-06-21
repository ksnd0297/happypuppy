import { StyleSheet, View } from "react-native";

const ChatListPage = () => {
  return (
    <View style={styles.container}>
      <View>HEADER</View>
      <View>UPCOMING RESERVATION</View>
      <View>CHAT LIST</View>
      <View>FOOTER</View>
    </View>
  );
};

export default ChatListPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5EE",
  },

  upcomingReservationContainer: {},

  chatListContainer: {},

  footerContainer: {},
});
