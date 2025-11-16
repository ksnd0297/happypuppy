import { StyleSheet, View } from "react-native";
import RepresentativeImage from "../components/register/RepresentativeImage";
import Nickname from "../components/register/Nickname";
import Age from "../components/register/Age";
import Address from "../components/register/Address";
import Introduce from "../components/register/Introduce";
import { FormProvider, useWatch } from "react-hook-form";

import Phone from "../components/register/Phone";
import Sex from "../components/register/Sex";
import useDisclosure from "../hooks/useDisclosure";

import ReportModal from "../components/register/ReportModal";

import RegisterButton from "../components/register/RegisterButton";
import { REGISTER_MODE } from "../enums/register";
import useRegisterForm from "../hooks/register/useRegisterForm";
import TermModal from "../components/TermModal";

const RegisterPage = () => {
  const reportModalDisclosure = useDisclosure();
  const termModalDisclosure = useDisclosure();

  const { form, mode, handleSubmit } = useRegisterForm();

  const { nickname } = useWatch({
    control: form.control,
  });

  const isAllFieldsFilled = !!nickname;
  const disabled = !isAllFieldsFilled || form.formState.isSubmitting;

  const handleClick = () => {
    if (mode === REGISTER_MODE.VIEW) {
      return reportModalDisclosure.handleOpen();
    }

    if (mode === REGISTER_MODE.REGISTER) {
      return termModalDisclosure.handleOpen();
    }

    if (mode === REGISTER_MODE.EDIT) {
      return handleSubmit();
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <View style={styles.container}>
          <View style={styles.imageArea}>
            <RepresentativeImage />
          </View>
          <View style={styles.formArea}>
            <Nickname />
            <Phone />
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Sex />
              <Age />
            </View>
            <Address />
            <Introduce />
          </View>
          <View style={{ ...styles.buttonArea }}>
            <RegisterButton disabled={disabled} mode={mode} handleClick={handleClick} />
          </View>
        </View>
      </FormProvider>
      <ReportModal isOpen={reportModalDisclosure.isOpen} handleClose={reportModalDisclosure.handleClose} />
      <TermModal isOpen={termModalDisclosure.isOpen} handleClose={termModalDisclosure.handleClose} handleSubmit={handleSubmit} isSubmitting={form.formState.isSubmitting} />
    </>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCF5EE",
  },

  imageArea: {
    flex: 0.25,

    justifyContent: "center",
    alignItems: "center",

    gap: 10,
  },

  formArea: {
    flex: 0.65,

    justifyContent: "space-around",
    alignItems: "center",
  },

  buttonArea: {
    flex: 0.1,

    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row",

    gap: 15,
  },
});
