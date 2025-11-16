import { Modal, View } from "react-native";
import Text from "../shared/Text";

type Props = {
  isOpen: boolean;
};

const CreateAppointModal = (props: Props) => {
  const { isOpen } = props;

  return (
    <Modal visible={isOpen} style={{ width: "100%", height: "100%" }} transparent={false}>
      <View>
        <Text>하이</Text>
      </View>
    </Modal>
  );
};

export default CreateAppointModal;
