import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import LoginPage from "./screens/Login";
import ChatListPage from "./screens/ChatList";
import RegisterPage from "./screens/Register";
import HomePage from "./screens/Home";
import AppointmentPage from "./screens/Appointment";
import ChatPage from "./screens/Chat";
import DefaultWebviewScreen from "./screens/DefaultWebviewScreen";
import UsageInfoPage from "./screens/UsageInfo";
import InspectionPage from "./screens/Inspection";

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
  Appointment: {
    id: number;
  };
  UsageInfo: undefined;
  Inspection: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Inspection" component={InspectionPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="UsageInfo" component={UsageInfoPage} />
        <Stack.Screen name="Webview" component={DefaultWebviewScreen} />
        <Stack.Screen
          name="Appointment"
          component={AppointmentPage}
          options={{
            presentation: "modal", // ✅ iOS 스타일 모달
            animation: "slide_from_bottom", // (선택) 아래에서 슬라이드
          }}
        />
        <Stack.Screen name="ChatList" component={ChatListPage} />
        <Stack.Screen name="Chat" component={ChatPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
