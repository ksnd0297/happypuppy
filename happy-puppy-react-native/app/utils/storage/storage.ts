import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async <T>(key: string, value: T) => {
  const jsonValue = JSON.stringify(value);

  await AsyncStorage.setItem(key, jsonValue);
};

export const getItem = async <T>(key: string) => {
  const res = await AsyncStorage.getItem(key);

  if (res) {
    return JSON.parse(res) as T;
  }
};

export const removeItem = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
