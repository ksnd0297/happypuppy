import { useCallback, useState } from "react";

const useDisclosure = (defaultValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, handleOpen, handleClose, handleToggle };
};

export default useDisclosure;
