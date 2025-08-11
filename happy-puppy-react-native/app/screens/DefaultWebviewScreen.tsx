import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Alert,
  SafeAreaView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import * as Location from "expo-location";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchInput from "../components/map/SearchInput";

const DefaultWebviewScreen = () => {
  const webViewRef = useRef<WebView>(null);
  const inputRef = useRef<TextInput>(null);
  const [query, setQuery] = useState("");
  const insets = useSafeAreaInsets(); // 안전 영역 정보 가져오기

  // 위치 조회
  const getLocation = async () => {
    try {
      // 위치 권한 요청
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        // 빠른 위치 조회 (getLastKnownPositionAsync)
        const fastLocation = await Location.getLastKnownPositionAsync();

        // 빠른 위치가 있으면 먼저 반환
        if (fastLocation) {
          sendLocationToWebView(fastLocation); // 빠른 위치 정보 전달
        }

        // 정확한 위치 조회 (getCurrentPositionAsync)
        const accurateLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High, // 높은 정확도로 위치 조회
        });
        sendLocationToWebView(accurateLocation); // 정확한 위치 정보 전달
      } else {
        Alert.alert(
          "위치 권한이 필요합니다",
          "위치 정보를 사용하려면 권한을 허용해야 합니다."
        );
      }
    } catch (error) {
      console.error("위치 조회 중 오류 발생:", error);
      Alert.alert("위치 조회 실패", "위치를 가져오는 데 실패했습니다.");
    }
  };

  // WebView에 위치 정보 전달
  const sendLocationToWebView = (location: Location.LocationObject) => {
    if (webViewRef.current) {
      // // 위치 정보를 웹뷰로 전달
      const data = {
        type: "location",
        data: location,
      };
      console.log(
        "웹뷰에 전달",
        JSON.stringify(data),
        webViewRef.current.postMessage
      );
      webViewRef.current.injectJavaScript(`
        if (window.receiveLocation) {
          window.receiveLocation(${JSON.stringify(location.coords)});
        }
      `);
    }
  };

  // 웹뷰에서 메시지를 받았을 때 처리하는 함수
  const onMessage = (event: WebViewMessageEvent) => {
    const message = event.nativeEvent.data;
    console.log("웹뷰에서 받은 메시지:", message);

    if (message === "locationRequest") {
      getLocation();
    }
  };

  const handleSearch = () => {
    inputRef.current?.blur();
    console.log("search query", query);
  };

  const handleChangeQuery = (text: string) => {
    setQuery(text);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        inputRef.current?.blur();
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={styles.container}>
        <SearchInput
          ref={inputRef}
          query={query}
          onChangeQuery={handleChangeQuery}
          onSubmit={handleSearch}
        />
        <WebView
          source={{ uri: "https://happy-puppy-react.vercel.app" }}
          style={[styles.webview, { marginTop: insets.top }]}
          ref={webViewRef}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowFileAccess={true}
          originWhitelist={["*"]}
          onMessage={onMessage}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webview: {
    flex: 1, // 웹뷰가 화면을 꽉 채우도록 설정
  },
});

export default DefaultWebviewScreen;
