import { Button, Modal } from "react-bootstrap";
import { RemoveMyDeckResultEnum } from "../../../model/enum/RemoveMyDeckResultEnum.enum";
import { PokemonDetail } from "../../../model/api/pokemon-detail.model";

class RemovePokemonModalComponentProps {
  message: RemoveMyDeckResultEnum;
  showModal: boolean;
  pokemonToRemove: PokemonDetail;

  onConfirm(): void;
  onClose(): void;
}

export function RemovePokemonModalComponent({
  message,
  showModal,
  pokemonToRemove,

  onConfirm,
  onClose,
}: RemovePokemonModalComponentProps) {
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Remove Pokemon</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message === RemoveMyDeckResultEnum.Success && (
          <>Pokemon remove to your deck successfully</>
        )}
        {message === RemoveMyDeckResultEnum.ToConfirm && (
          <>
            Do you want to remove{" "}
            <b className="text-capitalize">{pokemonToRemove.name}</b> from your
            deck?
          </>
        )}
        {message === RemoveMyDeckResultEnum.GenericError && (
          <>An error occurred, try again or contact support</>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
        {message === RemoveMyDeckResultEnum.ToConfirm && (
          <Button variant="primary" onClick={(_) => onConfirm()}>
            Confirm
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
