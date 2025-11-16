import { StyleSheet, View } from "react-native";
import Button, { ButtonType } from "../shared/Button";
import Select, { SelectType } from "../shared/Select";
import Textarea, { TextAreaType } from "../shared/Textarea";
import { useController, useForm } from "react-hook-form";
import { REPORT_FORM_DEFAULT_VALUES, REPORT_FORM_PATH } from "@/app/constants/register/form";
import useReport from "@/app/hooks/reoprt/useReport";
import { ReportType } from "@/app/services/report/types";
import useUserInfo from "@/app/hooks/auth/useUserInfo";
import Toast from "react-native-toast-message";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/app/RootStack";
import { isReportReason } from "@/app/utils/report/check";

// TODO : 혐오 발언, 자리비움, 욕설, 부정적인 태도로 분류 필요
const OPTION_LIST = [
  {
    label: "부정적인 태도",
    value: ReportType.HARASSMENT,
  },
  {
    label: "욕설",
    value: ReportType.HARASSMENT,
  },
  {
    label: "자리비움",
    value: ReportType.HARASSMENT,
  },
  {
    label: "혐오 발언",
    value: ReportType.HARASSMENT,
  },
];

type Props = {
  handleClose: () => void;
};

const ReportModalContent = (props: Props) => {
  const { handleClose } = props;

  const route = useRoute<RouteProp<RootStackParamList, "Register">>();
  const { params } = route;
  const { id: accuserId } = params || {};

  const form = useForm({
    defaultValues: REPORT_FORM_DEFAULT_VALUES,
  });

  const { userInfo } = useUserInfo();

  const { mutateAsync } = useReport();

  const handleSubmit = form.handleSubmit(async (value) => {
    const { userId: reporterId } = userInfo || {};

    if (!reporterId) throw new Error("신고자의 유저ID를 찾을 수 없습니다.");

    if (!accuserId) throw new Error("피신고자의 유저ID를 찾을 수 없습니다.");

    const reportType = isReportReason(value.reportReason) ? value.reportReason : "";

    if (!reportType) throw new Error("유효하지 않은 신고 사유입니다.");
    console.log("CALL");

    try {
      await mutateAsync({
        reporter: reporterId,
        accuser: accuserId,
        reasonType: reportType,
        reason: value.reportText,
      });

      handleClose();

      Toast.show({
        type: "success",
        text1: "신고가 접수되었습니다.",
      });
    } catch {
      Toast.show({
        type: "error",
        text1: "신고 접수에 실패했습니다. 다시 시도해 주세요.",
      });
    }
  });

  const {
    field: { value: reportReasonValue, onChange: handleChangeReportReason },
  } = useController({
    control: form.control,
    name: REPORT_FORM_PATH.REPORT_REASON,
    rules: {
      required: "신고 사유를 선택해 주세요",
    },
  });

  const {
    field: { value: reportTextValue, onChange: handleChangeReportText },
  } = useController({
    control: form.control,
    name: REPORT_FORM_PATH.REPORT_TEXT,
  });

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <View style={styles.reportContainer}>
          <Select
            essential
            onChange={(v) => {
              handleChangeReportReason(v.value);
            }}
            value={reportReasonValue}
            selectType={SelectType.TYPE1}
            label="신고사유"
            placeholder="신고 사유를 선택해 주세요"
            data={OPTION_LIST}
          />
          <Textarea value={reportTextValue} onChangeText={handleChangeReportText} inputType={TextAreaType.TYPE2} placeholder="신고 이유를 작성해 주세요" />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button buttonType={ButtonType.TYPE2} onPress={handleSubmit}>
          신고하기
        </Button>
      </View>
    </View>
  );
};

export default ReportModalContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  bodyContainer: {
    flex: 0.8,

    alignItems: "center",
    justifyContent: "center",
  },

  reportContainer: {
    gap: 20,
  },

  buttonContainer: {
    flex: 0.2,

    alignItems: "center",
    justifyContent: "center",
  },
});
