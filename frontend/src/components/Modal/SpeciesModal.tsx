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
        Scientific Name: {props.species.scientific_name}<br/>
        Kingdom: {props.species.kingdom}<br/>
        Phylum: {props.species.phylum}<br/>
        Class: {props.species._class}<br/>
        Order: {props.species.order}<br/>
        Family: {props.species.family}<br/>
        Subspecies: {props.species.subspecies}<br/>
        Subpopulations: {props.species.subpopulations}<br/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SpeciesModal;