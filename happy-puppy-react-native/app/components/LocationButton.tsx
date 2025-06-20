import React from 'react';
import { Button, Alert, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

interface LocationButtonProps {
  onLocationRetrieved: (location: Location.LocationObject) => void;
}

const LocationButton: React.FC<LocationButtonProps> = ({ onLocationRetrieved }) => {
  const getLocation = async () => {
    try {
      // 위치 권한 요청
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        // 빠른 위치 조회 (getLastKnownPositionAsync)
        const fastLocation = await Location.getLastKnownPositionAsync();

        // 빠른 위치가 있으면 먼저 반환
        if (fastLocation) {
          onLocationRetrieved(fastLocation); // 빠른 위치 정보 전달
        }

        // 정확한 위치 조회 (getCurrentPositionAsync)
        const accurateLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High, // 높은 정확도로 위치 조회
        });
        onLocationRetrieved(accurateLocation); // 정확한 위치 정보 전달
      } else {
        Alert.alert('위치 권한이 필요합니다', '위치 정보를 사용하려면 권한을 허용해야 합니다.');
      }
    } catch (error) {
      console.error('위치 조회 중 오류 발생:', error);
      Alert.alert('위치 조회 실패', '위치를 가져오는 데 실패했습니다.');
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <Button title="위치 조회" onPress={getLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 120, // 버튼 크기 조정
    height: 50, // 버튼 크기 조정
    zIndex: 999, // 버튼이 다른 요소들 위에 오도록 설정
  },
});

export default LocationButton;