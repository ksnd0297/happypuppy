export default () => ({
  expo: {
    name: "happy-puppy-react-native",
    slug: "happy-puppy-react-native",
    version: "1.0.0",
    orientation: "portrait",
    icon: "app/assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
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
    },
    web: {
      favicon: "./app/assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "19a26513-df06-4590-833b-44eefd713ed0",
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
          nativeAppKey: process.env.KAKAO_NATIVE_APP_KEY || "",
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
    ],
  },
});
