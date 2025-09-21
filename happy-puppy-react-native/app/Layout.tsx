import { initializeKakaoSDK } from "@react-native-kakao/core";
import { useCallback, useEffect } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { KAKAO_NATIVE_APP_KEY } from "@env";
import { LocaleConfig } from "react-native-calendars";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Dimensions, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
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
      <SafeAreaView style={styles.container}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            {props.children}
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default Layout;

const SCREEN_HEIGHT = Dimensions.get("screen").height; // device height
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
const WINDOW_HEIGHT = Dimensions.get("window").height;
const BOTTOM_NAVIGATION_BAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5EE",
    paddingTop: STATUS_BAR_HEIGHT,
    paddingBottom: BOTTOM_NAVIGATION_BAR_HEIGHT,
  },
});
