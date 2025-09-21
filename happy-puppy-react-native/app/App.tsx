import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import DefaultWebviewScreen from "./screens/DefaultWebviewScreen";
import LoginPage from "./screens/Login";
import RegisterPage from "./screens/Register";
import ChatPage from "./screens/Chat";
import { initializeKakaoSDK } from "@react-native-kakao/core";
import { useCallback, useEffect } from "react";
import { KAKAO_NATIVE_APP_KEY } from "@env";
import { Platform, SafeAreaView, StatusBar, View } from "react-native";
import ChatListPage from "./screens/ChatList";
import { RouteId } from "./types/route";
import HomePage from "./screens/Home";
import { LocaleConfig } from "react-native-calendars";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppointmentPage from "./screens/Appointment";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

LocaleConfig.locales["ko"] = {
  monthNames: ["01월", "02월", "03월", "04월", "05월", "06월", "07월", "08월", "09월", "10월", "11월", "12월"],
  monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};
LocaleConfig.defaultLocale = "ko";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

// TODO : useRouter 로 랩핑해서 제작
export type RootStackParamList = {
  Login: undefined;
  Register?: {
    id: RouteId;
  };
  ChatList: undefined;
  Chat: {
    id: RouteId;
  };
  Webview: undefined;
  Home: undefined;
  Appointment: undefined;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useEffect(() => {
    initializeKakaoSDK(KAKAO_NATIVE_APP_KEY);
  }, []);

  const [fontsLoaded] = Font.useFonts({
    SeoulNamsanB: require("@/app/assets/fonts/SeoulNamsanB.ttf"),
  });

  const onLayoutRootView = useCallback(() => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      SplashScreen.hide();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: "#FCF5EE",
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            paddingBottom: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        >
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="ChatList" component={ChatListPage} />
                <Stack.Screen name="Register" component={RegisterPage} />
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Appointment" component={AppointmentPage} />
                <Stack.Screen name="Chat" component={ChatPage} />
                <Stack.Screen name="Webview" component={DefaultWebviewScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </SafeAreaView>
        <Toast />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
