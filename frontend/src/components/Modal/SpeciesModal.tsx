import React from 'react'; 
import {Modal, Button, Image,} from 'react-bootstrap'

function SpeciesModal(props : any) {
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
        Taxonomic Notes: <br/><div dangerouslySetInnerHTML={{ __html: props.species.taxonomic_notes }}></div><br/>
        Subspecies: {props.species.subspecies}<br/>
        Subpopulations: {props.species.subpopulations}<br/>
        Population Trend: {props.species.population_trend}<br/>
        Marine: {props.species.marine.toString()}<br/>
        Freshwater: {props.species.freshwater.toString()}<br/>
        Terrestrial: {props.species.terrestrial.toString()}<br/>

        Rationale: <br/><div dangerouslySetInnerHTML={{ __html: props.species.rationale }}></div><br/>
        Geographic Range: <br/><div dangerouslySetInnerHTML={{ __html: props.species.geographic_range }}></div><br/>
        Population: <br/><div dangerouslySetInnerHTML={{ __html: props.species.population }}></div><br/>
        Habitat Desc: <br/><div dangerouslySetInnerHTML={{ __html: props.species.habitat }}></div><br/>
        Threats: <br/><div dangerouslySetInnerHTML={{ __html: props.species.threats }}></div><br/>
        Conservation Measures: <br/><div dangerouslySetInnerHTML={{ __html: props.species.conservation_measures }}></div><br/>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SpeciesModal;