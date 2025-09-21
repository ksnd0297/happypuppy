import { StyleSheet, View } from "react-native";
import Button, { ButtonType } from "../shared/Button";
import Select, { SelectType } from "../shared/Select";
import Textarea, { TextAreaType } from "../shared/Textarea";
import { useController, useForm } from "react-hook-form";
import { REPORT_FORM_DEFAULT_VALUES, REPORT_FORM_PATH } from "@/app/constants/register/form";

const OPTION_LIST = [
  {
    label: "부정적인 태도",
    value: "a",
  },
  {
    label: "욕설",
    value: "b",
  },
  {
    label: "자리비움",
    value: "c",
  },
  {
    label: "혐오 발언",
    value: "d",
  },
];

type Props = {
  handleClose: () => void;
};

const ReportModalContent = (props: Props) => {
  const { handleClose } = props;

  const form = useForm({
    defaultValues: REPORT_FORM_DEFAULT_VALUES,
  });

  const handleSubmit = form.handleSubmit(
    (value) => {
      handleClose();

      // TODO : 신고 API 부착
      return value;
    },
    (error) => {
      console.log("error : ", error);
      // TODO : 신고 토스트 노출
    }
  );

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
          <Select essential onChange={handleChangeReportReason} value={reportReasonValue} selectType={SelectType.TYPE1} label="신고사유" placeholder="신고 사유를 선택해 주세요" data={OPTION_LIST} />
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
