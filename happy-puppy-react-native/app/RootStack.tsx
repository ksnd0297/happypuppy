import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import LoginPage from "./screens/Login";
import ChatListPage from "./screens/ChatList";
import RegisterPage from "./screens/Register";
import HomePage from "./screens/Home";
import AppointmentPage from "./screens/Appointment";
import ChatPage from "./screens/Chat";
import DefaultWebviewScreen from "./screens/DefaultWebviewScreen";

export type RootStackParamList = {
  Login: undefined;
  Register?: {
    id: number;
  };
  ChatList: undefined;
  Chat: {
    id: number;
  };
  Webview: undefined;
  Home: undefined;
  Appointment: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Appointment" component={AppointmentPage} />
        <Stack.Screen name="ChatList" component={ChatListPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Chat" component={ChatPage} />
        <Stack.Screen name="Webview" component={DefaultWebviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
