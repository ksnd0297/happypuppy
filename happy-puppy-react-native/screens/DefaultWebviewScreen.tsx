import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const DefaultWebviewScreen = () => {
  return (
    <View style={styles.container}>
      {/* url 설정 필요 (임시로 로컬 uri 사용) */}
      <WebView source={{uri: 'http://172.20.36.213:3000'}} originWhitelist={['*']} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DefaultWebviewScreen;