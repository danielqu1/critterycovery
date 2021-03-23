import React from 'react'; 
import {Modal, Button} from 'react-bootstrap'

function changeContent(props: any){
  return
}

function SpeciesModal(props: any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.species.common_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Scientific Name: {props.species.scientific_name}
        Kingdom: {props.species.kingdom}
        Phylum: {props.species.phylum}
        Class: {props.species._class}
        Order: {props.species.order}
        Family: {props.species.family}
        Subspecies: {props.species.subspecies}
        Subpopulations: {props.species.subpopulations}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SpeciesModal;