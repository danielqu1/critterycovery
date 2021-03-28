import React from 'react'; 
import {Modal, Button, Image} from 'react-bootstrap'

function SpeciesModal(props: any) {
  if(props.species == null){
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
          {props.species.common_name ? props.species.common_name : props.species.scientific_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Image src={props.species.image_link} rounded fluid style={{width:'50%'}}/><br/>
        Scientific Name: {props.species.scientific_name}<br/>
        Kingdom: {props.species.kingdom}<br/>
        Phylum: {props.species.phylum}<br/>
        Class: {props.species._class}<br/>
        Order: {props.species._order}<br/>
        Family: {props.species.family}<br/>
        Genus: {props.species.genus}<br/>
        Taxonomic Notes: <br/>{props.species.taxonomic_notes}<br/>
        Subspecies: {props.species.subspecies}<br/>
        Subpopulations: {props.species.subpopulations}<br/>
        Population Trend: {props.species.population_trend}<br/>
        Marine: {props.species.marine.toString()}<br/>
        Freshwater: {props.species.freshwater.toString()}<br/>
        Terrestrial: {props.species.terrestrial.toString()}<br/>

        Rationale: <html>{props.species.rationale}</html><br/>
        Geographic Range: {props.species.geographic_range}<br/>
        Population: {props.species.population}<br/>
        Habitat Desc: {props.species.habitat}<br/>
        Threats: {props.species.threats}<br/>
        Conservation Measures: {props.species.conservation_measures}<br/>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SpeciesModal;