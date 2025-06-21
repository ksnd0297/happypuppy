import React, { useRef, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import LocationButton from "../components/LocationButton";
import * as Location from "expo-location";

const DefaultWebviewScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const webViewRef = useRef<WebView>(null);

  // WebView에 위치 정보 전달
  const sendLocationToWebView = (location: Location.LocationObject) => {
    setLocation(location);

    if (webViewRef.current) {
      // 위치 정보를 웹뷰로 전달
      const locationData = JSON.stringify(location.coords);
      webViewRef.current.injectJavaScript(`
        if (window.receiveLocation) {
          window.receiveLocation(${locationData});
        }
      `);
    }
  };

  // 웹뷰에서 메시지를 받았을 때 처리하는 함수
  const onMessage = (event: WebViewMessageEvent) => {
    const message = event.nativeEvent.data;
    console.log("웹뷰에서 받은 메시지:", message);

    if (message === "locationRequest") {
      if (location) {
        // 위치 정보를 웹뷰에 전달
        sendLocationToWebView(location);
      } else {
        alert("위치 정보를 먼저 조회해주세요.");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* url 설정 필요 (임시로 로컬 uri 사용) */}
      <WebView
        source={{ uri: "http://192.168.0.254:3000/" }}
        ref={webViewRef}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        originWhitelist={["*"]}
        onMessage={onMessage} // 웹뷰에서 메시지 받기
      />
      {/* 위치 버튼 컴포넌트, 위치를 조회하여 웹뷰에 전달 */}
      <LocationButton onLocationRetrieved={sendLocationToWebView} />

      {/* 위치 정보가 있으면 표시 */}
      {location && (
        <View>
          <Text>위도: {location.coords.latitude}</Text>
          <Text>경도: {location.coords.longitude}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DefaultWebviewScreen;
