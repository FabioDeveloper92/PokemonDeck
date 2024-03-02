import { Modal } from "react-bootstrap";

class PokemonAbilityDescriptionModalProps {
  showModal: boolean;

  title: string;
  message: string;

  onClose(): void;
}

export function PokemonAbilityDescriptionModal({
  showModal,
  message,
  title,

  onClose,
}: PokemonAbilityDescriptionModalProps) {
  return (
    <Modal show={showModal} size="sm" onHide={onClose} className="modal-sm">
      <Modal.Header closeButton closeVariant="small">
        <Modal.Title className="h6 text-capitalize">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message ?? "Not Available"}</Modal.Body>
    </Modal>
  );
}
