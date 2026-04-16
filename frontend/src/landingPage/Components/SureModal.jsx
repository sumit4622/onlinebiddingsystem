import { Modal, Button } from "react-bootstrap";

export default function SureModal({ onClose, onContinue }) {
  return (
    <Modal show={true} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Do you want to proceed?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onContinue}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
