import React from 'react'; 
import {Modal, Button, Image} from 'react-bootstrap'
import axios from 'axios'

interface species{
  scientific_name: string;
}

interface habitats{
  name: string;
}

function CountryModal(props: any) {
  const [species, setSpecies] = React.useState(new Array<species>());
  const [habitats, setHabitats] = React.useState(new Array<habitats>());
  React.useEffect(() => {
    setSpecies(new Array<species>())
    if(props.country != null){
      axios.get('/api/countries/species/name='+props.country.name).then((response) => {
        setSpecies(response.data.species);
      })
    }
  }, [props.country]);

  React.useEffect(() => {
    setHabitats(new Array<habitats>())
    if(props.country != null){
        axios.get('/api/countries/habitats/name='+props.country.name).then((response) => {
          setHabitats(response.data.habitats);
        })
    }
  }, [props.country]);

  if(props.country == null){
    return(<a></a>)
  }

  const speciesLinks = [];
  for (let i = 0; i < species.length; i++) {
    speciesLinks.push(<a style={{ cursor: 'pointer' }} href={'/species/'+species[i].scientific_name}>{species[i].scientific_name+' '}</a>);
  }
  speciesLinks.push(<br/>)

  const habitatLinks = [];
  for (let i = 0; i < habitats.length; i++) {
    habitatLinks.push(<a style={{ cursor: 'pointer' }} href={'/habitats/'+habitats[i].name}>{habitats[i].name+' '}</a>);
  }
  habitatLinks.push(<br/>)
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
        Latitude: {props.country.latitude}&deg;<br/>
        Longitude: {props.country.longitude}&deg;<br/>
        Area: {props.country.area} km&sup2;<br/>
        Gini Index: {props.country.gini_index}<br/>
        <iframe title="Map of Country"
          width="600"
          height="450"
          style={{border: 0}}
          loading="lazy"
          allowFullScreen
          src={props.country.embedded_map_link}>
        </iframe> <br/>

        Species: <br/> {speciesLinks} <br/>
        Habitats: <br/> {habitatLinks} <br/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CountryModal;