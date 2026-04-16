import { Modal, Button } from "react-bootstrap";

export default function SureModal({ show, onHide, onConfirm, bidAmount }) {
  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Your Bid</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to place a bid of <strong>Rs.{bidAmount}</strong>?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
