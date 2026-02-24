export default () => ({
  expo: {
    name: "해피퍼피",
    slug: "happypuppy",
    version: "1.0.0",
    orientation: "portrait",
    icon: "app/assets/default.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    extra: {
      eas: {
        projectId: "674a2f12-31e0-43a1-a247-afeb00d92362",
      },
    },
    splash: {
      image: "app/assets/happypuppy.png",
      resizeMode: "contain",
      backgroundColor: "#FCF5EE",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.happypuppy.app",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./app/assets/happypuppy.png",
        backgroundColor: "#FCF5EE",
      },
      edgeToEdgeEnabled: true,
      package: "com.happypuppy.app",
      softwareKeyboardLayoutMode: "pan",
      permissions: ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION"],
    },
    web: {
      favicon: "./app/assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "674a2f12-31e0-43a1-a247-afeb00d92362",
      },
    },
    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            extraMavenRepos: ["https://devrepo.kakao.com/nexus/content/groups/public/"],
          },
        },
      ],
      [
        "@react-native-kakao/core",
        {
          nativeAppKey: "8088bb107c6bf6a5698dc6efc0f8b083",
          android: {
            authCodeHandlerActivity: true,
          },
          ios: {
            handleKakaoOpenUrl: true,
          },
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission: "The app accesses your photos to let you share them with your friends.",
        },
      ],
      [
        "expo-splash-screen",
        {
          backgroundColor: "#FCF5EE",
          image: "./app/assets/happypuppy.png",
          imageWidth: 200,
        },
      ],
      [
        "expo-location",
        {
          locationAlwaysAndWhenInUsePermission: "Allow $(PRODUCT_NAME) to use your location.",
        },
      ],
    ],
  },
});
