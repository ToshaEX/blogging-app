import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  Text,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import SecondaryButton from "../SecondaryButton";

type ModalProps = {
  bodyText: string;
  modalTitle: string;
  actionLabel: string;
  handleAction: () => void;
  isOpen: boolean;
  onClose: () => void;
};
const ModalView = ({
  bodyText,
  actionLabel,
  handleAction,
  modalTitle,
  isOpen,
  onClose,
}: ModalProps) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{bodyText}</Text>
        </ModalBody>
        <ModalFooter gap={5}>
          <SecondaryButton label="Close" handleClick={onClose} />

          <Button
            variant="ghost"
            color={"red.500"}
            onClick={() => {
              handleAction();
              onClose();
            }}
          >
            {actionLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalView;
