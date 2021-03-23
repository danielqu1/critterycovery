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
        alpha2 Code: {props.country.alpha2_code}<br/>
        alpha3 Code: {props.country.alpha3_code}<br/>
        Total Population: {props.country.total_pop}<br/>
        Capital: {props.country.capital}<br/>
        Region: {props.country.region}<br/>
        Subregion: {props.country.subregion}<br/>
        Latitude: {props.country.latitude}<br/>
        Longitude: {props.country.longitude}<br/>
        Area: {props.country.area}<br/>
        Gini Index: {props.country.gini_index}<br/>
        Flag: {props.country.flag}<br/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CountryModal;