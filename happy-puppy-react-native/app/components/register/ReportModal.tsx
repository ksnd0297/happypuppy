import Modal from "../ReportModal/Modal";
import ReportModalContent from "../ReportModal/ReportModalContent";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const ReportModal = (props: Props) => {
  const { isOpen, handleClose } = props;

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <ReportModalContent handleClose={handleClose} />
    </Modal>
  );
};

export default ReportModal;
