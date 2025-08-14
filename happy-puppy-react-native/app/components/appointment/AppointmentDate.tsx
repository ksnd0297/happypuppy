import { Pressable, StyleSheet, View } from "react-native";

import Text from "../shared/Text";
import DatePicker from "react-native-date-picker";
import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const AppointmentDate = () => {
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openTimeModal, setOpenTimeModal] = useState(false);

  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<Date | undefined>();

  const formatToYmdWithDate = () => {
    if (date) {
      return format(date, "yy. M. d. (E)", { locale: ko });
    }
  };

  const formatToAMPMTime = () => {
    if (time) {
      return format(time, "a h시 m분", { locale: ko });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.buttonWrapper}>
          <Pressable style={styles.buttonContainer} onPress={() => setOpenDateModal(true)}>
            <Text gray={!date}>{date ? formatToYmdWithDate() : "날짜 선택 (필수)"}</Text>
          </Pressable>

          <Pressable style={styles.buttonContainer} onPress={() => setOpenTimeModal(true)}>
            <Text gray={!time}>{time ? formatToAMPMTime() : "시간 선택 (필수)"}</Text>
          </Pressable>
        </View>
      </View>
      <DatePicker
        modal
        mode="date"
        open={openDateModal}
        date={date ? date : new Date()}
        onConfirm={(date) => {
          setDate(date);
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
        date={time ? time : new Date()}
        onConfirm={(date) => {
          setTime(date);
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
