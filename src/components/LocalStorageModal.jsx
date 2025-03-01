import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// DELETABLE, not in use
function LocalStorageModal(props) {
  // console.log("modal props", props);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You saved data to your device - would you like to put those values into the form?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Dismiss
          </Button>
          <Button variant="primary" onClick={props.onClose}>
            Use Saved Data
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LocalStorageModal;