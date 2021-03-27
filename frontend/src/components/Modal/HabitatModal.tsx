import React from 'react'; 
import {Modal, Button} from 'react-bootstrap'
import { useHistory } from "react-router-dom";

function HabitatModal(props: any) {
  if(props.habitat == null){
    return(<a></a>)
  }
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
        ID: {props.habitat.id.toString()}<br/>
        Marine: {props.habitat.marine.toString()}<br/>
        Water Area: {props.habitat.reported_marine_area.toString()}<br/>
        Land Area: {props.habitat.reported_terrestrial_area.toString()}<br/>
        Countries: {props.habitat.countries}<br/>
        icun Category: {(props.habitat.icun_category)? props.habitat.icun_category.toString() : ""}<br/>
        Designation: {props.habitat.designation_name}<br/>
        Link: <a href={props.habitat.link}>{props.habitat.link}</a><br/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default HabitatModal;