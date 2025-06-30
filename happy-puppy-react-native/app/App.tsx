import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

const Stack = createNativeStackNavigator();

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
            <Stack.Screen name="ChatList" component={ChatListPage} />
            <Stack.Screen name="Chat" component={ChatPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Webview" component={DefaultWebviewScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
}
