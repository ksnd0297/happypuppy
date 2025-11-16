import Modal from "../ReportModal/Modal";
import TermModalContent from "./TermModalContent";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  isSubmitting: boolean;
};

const TermModal = (props: Props) => {
  const { isOpen, handleClose, handleSubmit, isSubmitting } = props;

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <TermModalContent handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </Modal>
  );
};

export default TermModal;
