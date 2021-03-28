import React from 'react'; 
import {Modal, Button, Image} from 'react-bootstrap'

function CountryModal(props: any) {
  if(props.country == null){
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
          {props.country.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={props.country.flag} rounded fluid style={{width:'50%'}}/><br/>
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
        <iframe title="Map of Country"
          width="600"
          height="450"
          style={{border: 0}}
          loading="lazy"
          allowFullScreen
          src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyCEuQ1QfuLRbXpgy16yPdz44kWYTrHHKlc&q=country+"+props.country.name}>
        </iframe>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CountryModal;