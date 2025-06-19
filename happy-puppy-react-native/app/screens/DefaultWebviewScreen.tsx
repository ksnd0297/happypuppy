import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const DefaultWebviewScreen = () => {
  return (
    <View style={styles.container}>
      {/* url 설정 필요 (임시로 로컬 uri 사용) */}
      <WebView source={{uri: 'http://192.168.0.254:3000/'}}
  javaScriptEnabled={true}
  domStorageEnabled={true}
  allowFileAccess={true}
  originWhitelist={['*']}
/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DefaultWebviewScreen;