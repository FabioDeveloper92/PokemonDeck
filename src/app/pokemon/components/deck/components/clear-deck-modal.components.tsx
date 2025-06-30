import { Button, Modal } from "react-bootstrap";

class ClearDeckModalComponentProps {
  message: string;
  showModal: boolean;

  onConfirm(): void;
  onClose(): void;
}

export function ClearDeckModalComponent({
  message,
  showModal,

  onConfirm,
  onClose,
}: ClearDeckModalComponentProps) {
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Clear Deck</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message ? message : <>Do you want to remove all cards of your</>}
        deck?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
        {!message && (
          <Button variant="primary" onClick={(_) => onConfirm()}>
            Confirm
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
