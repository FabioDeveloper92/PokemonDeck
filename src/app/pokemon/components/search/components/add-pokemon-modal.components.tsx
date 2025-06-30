import { Button, Modal } from "react-bootstrap";
import { AddMyDeckResultEnum } from "../../../model/enum/AddMyDeckResultEnum.enum";
import { AddMyDeckResult } from "../../../model/internal/add-my-deck-result.model";

class AddPokemonModalComponentProps {
  showModal: boolean;
  message: AddMyDeckResult;

  onConfirm(): void;
  onClose(): void;
}

export function AddPokemonModalComponent({
  showModal,
  message,

  onConfirm,
  onClose,
}: AddPokemonModalComponentProps) {
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Pokemon</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && (
          <>
            {message.result === AddMyDeckResultEnum.Success && (
              <>Pokemon added to your deck successfully</>
            )}
            {message.result === AddMyDeckResultEnum.MaxCapacity && (
              <>
                You have reached the maximum capacity of your deck.
                <br />
                If you continue <b>{message.pokemonToRemove} </b>
                inserted will be removed.
                <br />
                <br />
                Do you want continue?
              </>
            )}
            {message.result === AddMyDeckResultEnum.PokemonFound && (
              <>Pokemon already present in your deck</>
            )}
            {message.result === AddMyDeckResultEnum.GenericError && (
              <>An error occurred, try again or contact support</>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          Close
        </Button>
        {message && message.result === AddMyDeckResultEnum.MaxCapacity && (
          <Button variant="primary" onClick={(_) => onConfirm()}>
            Continue
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
