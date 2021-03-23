import React from 'react'; 
import {Modal, Button} from 'react-bootstrap'

function changeContent(props: any){
  return
}

function HabitatModal(props: any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.habitat.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Is Marine?: {props.habitat.marine}<br/>
        Marine Area: {props.habitat.reported_marine_area}<br/>
        Land Area: {props.habitat.reported_terrestrial_area}<br/>
        Countries: {props.habitat.countries}<br/>
        icun Category: {props.habitat.icun_category}<br/>
        Designation: {props.habitat.designation}<br/>
        Link: {props.habitat.link}<br/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default HabitatModal;