import { Linking, Pressable, StyleSheet, View } from "react-native";
import Button, { ButtonType } from "../shared/Button";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Text from "../shared/Text";
import { useState } from "react";

type Props = {
  handleSubmit: () => void;
  isSubmitting: boolean;
};

const TERM = {
  isOver18: {
    isChecked: false,
    text: "[필수] 만 18세 이상 회원입니다.",
    link: "https://docs.google.com/document/d/1kfyf6kbN_vi2L5hv0HWtf0N8JoIBoa4TFaZ8i3GHK_g/edit?tab=t.0",
  },
  agreedToPersonalInfo: {
    isChecked: false,
    text: "[필수] 개인정보 수집 및 이용 동의",
    link: "https://docs.google.com/document/d/1kfyf6kbN_vi2L5hv0HWtf0N8JoIBoa4TFaZ8i3GHK_g/edit?tab=t.hnpyeqvw6vqe",
  },
  isLocationServiceConsent: {
    isChecked: false,
    text: "[필수] 위치 정보 서비스 이용약관",
    link: "https://docs.google.com/document/d/1kfyf6kbN_vi2L5hv0HWtf0N8JoIBoa4TFaZ8i3GHK_g/edit?tab=t.746sth1zadlk",
  },
};

const TermModalContent = (props: Props) => {
  const { handleSubmit } = props;

  const [term, setTerm] = useState(TERM);

  const isAllAgreed = Object.values(term).every((value) => value.isChecked);

  const handleNavigationNotice = (link: string) => {
    Linking.openURL(link);
  };

  const handleAgreeAll = () => {
    setTerm({
      isOver18: {
        ...TERM["isOver18"],
        isChecked: !isAllAgreed,
      },
      agreedToPersonalInfo: {
        ...TERM["agreedToPersonalInfo"],
        isChecked: !isAllAgreed,
      },
      isLocationServiceConsent: {
        ...TERM["isLocationServiceConsent"],
        isChecked: !isAllAgreed,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text large bold>
          회원가입
        </Text>
        <Text small bold>
          회원가입 전, 해피퍼피 약관들을 확인해주세요
        </Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.termContainer}>
          <BouncyCheckbox
            size={25}
            fillColor="orange"
            innerIconStyle={{ borderWidth: 2 }}
            style={{ gap: 10 }}
            onPress={handleAgreeAll}
            isChecked={isAllAgreed}
            textComponent={
              <>
                <Text bold center>
                  모두 동의합니다
                </Text>
              </>
            }
          />
          <View style={{ height: 2, width: "100%", backgroundColor: "#cccccc" }} />
          {Object.entries(term).map(([key, value]) => (
            <BouncyCheckbox
              key={key}
              size={25}
              fillColor="orange"
              isChecked={value.isChecked}
              innerIconStyle={{ borderWidth: 2 }}
              style={{ gap: 10 }}
              onPress={(isChecked: boolean) => {
                setTerm({
                  ...term,
                  [key]: {
                    ...value,
                    isChecked,
                  },
                });
              }}
              textComponent={
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                  <Text center>{value.text}</Text>
                  <Pressable onPress={() => handleNavigationNotice(value.link)}>
                    <Text center gray>
                      {">"}
                    </Text>
                  </Pressable>
                </View>
              }
            />
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button buttonType={ButtonType.TYPE1} onPress={handleSubmit} disabled={!isAllAgreed}>
          입장하기
        </Button>
      </View>
    </View>
  );
};

export default TermModalContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  headerContainer: {
    flex: 0.1,

    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  bodyContainer: {
    flex: 0.7,

    alignItems: "center",
    justifyContent: "center",

    padding: 10,
  },

  termContainer: {
    gap: 20,

    flex: 0.8,
    width: "100%",

    padding: 10,

    justifyContent: "center",
  },

  buttonContainer: {
    flex: 0.1,

    alignItems: "center",
    justifyContent: "center",
  },
});
