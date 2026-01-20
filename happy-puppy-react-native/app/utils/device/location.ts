import * as Location from "expo-location";
import { Alert } from "react-native";

export const getLocation = async () => {
  const DEFAULT_LOCATION = {
    latitude: 37.5665,
    longitude: 126.978,
  };

  try {
    const { status } = await Location.getForegroundPermissionsAsync();

    if (status === Location.PermissionStatus.DENIED) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === Location.PermissionStatus.DENIED) {
        Alert.alert("위치 권한이 필요합니다", "위치 정보를 사용하려면 권한을 허용해야 합니다.");

        return DEFAULT_LOCATION;
      } else {
        const accurateLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });

        if (accurateLocation) {
          const { coords } = accurateLocation;
          const { latitude, longitude } = coords;

          return { latitude, longitude };
        }
      }
    }

    if (status === Location.PermissionStatus.GRANTED) {
      const accurateLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });

      if (accurateLocation) {
        const { coords } = accurateLocation;
        const { latitude, longitude } = coords;

        return { latitude, longitude };
      }
    }

    return DEFAULT_LOCATION;
  } catch {
    Alert.alert("위치 조회 실패", "위치를 가져오는 데 실패했습니다.");
  }
};
