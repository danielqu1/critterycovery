import React from 'react'; 
import {Modal, Button, Image} from 'react-bootstrap'
import axios from 'axios'

interface species{
  scientific_name: string;
}

interface country{
  name: string;
  alpha3_code: string;
}

function HabitatModal(props: any) {
  const country_default : country = {name: 'United States of America', alpha3_code: 'USA'}
  const [species, setSpecies] = React.useState(new Array<species>());
  const [country, setCountry] = React.useState(country_default);

  React.useEffect(() => {
    if(props.habitat != null){
      axios.get('/api/countries/alpha3_code='+props.habitat.countries).then((response) => {
        setCountry(response.data.country);
      })
    }
  }, [props.habitat]);

  React.useEffect(() => {
    setSpecies(new Array<species>())
    if(props.habitat != null){
      axios.get('/api/countries/species/name='+country.name).then((response) => {
        setSpecies(response.data.species);
      })
    }
  }, [country]);

  if(props.habitat == null){
    return(<a></a>)
  }
  const speciesLinks = [];
  for (let i = 0; i < species.length; i++) {
    speciesLinks.push(<a style={{ cursor: 'pointer' }} href={'/species/'+species[i].scientific_name}>{species[i].scientific_name+' '}</a>);
  }
  speciesLinks.push(<br/>)

  let countryLink = <a></a>;
  if(country != null){
    countryLink = (<a style={{ cursor: 'pointer' }} href={'/countries/'+country.name}>{country.name+' '}</a>)
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
        <Image src={props.habitat.image_link} rounded fluid style={{width:'50%'}}/><br/>
        ID: {props.habitat.id.toString()}<br/>
        Marine: {props.habitat.marine.toString()}<br/>
        Water Area: {props.habitat.reported_marine_area.toString()}<br/>
        Land Area: {props.habitat.reported_terrestrial_area.toString()}<br/>
        icun Category: {(props.habitat.icun_category)? props.habitat.icun_category.toString() : ""}<br/>
        Designation: {props.habitat.designation_name}<br/>
        Link: <a href={props.habitat.link}>{props.habitat.link}</a><br/>
        <iframe title="Map of Country"
          width="100%"
          height="20%"
          style={{border: 0}}
          loading="lazy"
          allowFullScreen
          src={props.habitat.embedded_map_link}>
        </iframe> <br/>
        Country: <br/>{countryLink}<br/>
        Species: <br/>{speciesLinks}<br/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default HabitatModal;