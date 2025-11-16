import WebView from "react-native-webview";

type SendLocationToWebView = {
  webViewRef: WebView;
  latitude: number;
  longitude: number;
};

export const sendLocationToWebView = (props: SendLocationToWebView) => {
  const { webViewRef, latitude, longitude } = props;

  webViewRef.postMessage(
    "" +
      JSON.stringify({
        type: "POSITION",
        data: {
          latitude,
          longitude,
        },
      })
  );
};
