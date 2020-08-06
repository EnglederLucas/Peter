import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const OptionsModal = (props: any) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Options</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Coming Soon</p>
        <InputGroup className="mb-3"></InputGroup>{" "}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="success" onClick={props.onHide}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OptionsModal;
