import { Pressable, StyleSheet, View } from "react-native";

import Text from "../shared/Text";
import DatePicker from "react-native-date-picker";
import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useController } from "react-hook-form";
import { APPOINTMENT_FORM_PATH } from "@/app/constants/appointment/form";

const AppointmentDate = () => {
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);

  const {
    field: { value: dateValue, onChange: onChangeDate },
  } = useController({
    name: APPOINTMENT_FORM_PATH.DATE,
    rules: {
      required: "약속 날짜는 필수 입력입니다.",
    },
  });

  const {
    field: { value: timeValue, onChange: onChangeTime },
  } = useController({
    name: APPOINTMENT_FORM_PATH.TIME,
    rules: {
      required: "약속 시간은 필수 입력입니다.",
    },
  });

  const handleChangeDate = (selectedDate: Date) => {
    onChangeDate(formatToYmd(selectedDate));
  };

  const handleChangeTime = (selectedTime: Date) => {
    onChangeTime(formatToHms(selectedTime));
  };

  const formatToYmd = (value: Date) => {
    if (value) {
      return format(value, "yyyy-MM-dd", { locale: ko });
    }
  };

  const formatToHms = (value: Date) => {
    if (value) {
      return format(value, "HH:mm:ss", { locale: ko });
    }
  };

  const formatToYmdWithDate = () => {
    if (dateValue) {
      return format(dateValue, "yy. M. d. (E)", { locale: ko });
    }
  };

  const formatToAMPMTime = () => {
    if (timeValue) {
      const dateTime = new Date(`1970-01-01T${timeValue}`);
      return format(dateTime, "a h시 m분", { locale: ko });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.buttonWrapper}>
          <Pressable style={styles.buttonContainer} onPress={() => setOpenDateModal(true)}>
            <Text gray={!dateValue}>{dateValue ? formatToYmdWithDate() : "날짜 선택 (필수)"}</Text>
          </Pressable>

          <Pressable style={styles.buttonContainer} onPress={() => setOpenTimeModal(true)}>
            <Text gray={!timeValue}>{timeValue ? formatToAMPMTime() : "시간 선택 (필수)"}</Text>
          </Pressable>
        </View>
      </View>
      <DatePicker
        modal
        mode="date"
        open={openDateModal}
        date={dateValue ? new Date(dateValue) : new Date()}
        onConfirm={(date) => {
          handleChangeDate(date);
          setOpenDateModal(false);
        }}
        onCancel={() => {
          setOpenDateModal(false);
        }}
      />
      <DatePicker
        modal
        mode="time"
        open={openTimeModal}
        date={timeValue ? new Date(`1970-01-01T${timeValue}`) : new Date()}
        onConfirm={(date) => {
          handleChangeTime(date);
          setOpenTimeModal(false);
        }}
        onCancel={() => {
          setOpenTimeModal(false);
        }}
      />
    </>
  );
};

export default AppointmentDate;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonWrapper: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    gap: 10,
  },

  buttonContainer: {
    flex: 1,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,

    backgroundColor: "white",
    borderColor: "#D9D9D9",
    borderWidth: 0.5,
    fontSize: 15,
  },
});
