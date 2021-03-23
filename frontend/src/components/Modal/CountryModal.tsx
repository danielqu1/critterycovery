import React from 'react'; 
import {Modal, Button} from 'react-bootstrap'

function changeContent(props: any){
  return
}

function CountryModal(props: any) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.species.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        alpha2 Code: {props.country.alpha2_code}
        alpha3 Code: {props.country.alpha3_code}
        Total Population: {props.country.total_pop}
        Capital: {props.country.capital}
        Region: {props.country.region}
        Subregion: {props.country.subregion}
        Latitude: {props.country.latitude}
        Longitude: {props.country.longitude}
        Area: {props.country.area}
        Gini Index: {props.country.gini_index}
        Flag: {props.country.flag}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CountryModal;