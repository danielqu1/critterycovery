import React from 'react'; 
import {Modal, Button, Image} from 'react-bootstrap'
import axios from 'axios'

interface species{
  scientific_name: string;
}

interface habitats{
  name: string;
}

const no_info = "information not available"

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
	return(<></>)
  }

  const speciesLinks = [];
  for (let i = 0; i < species.length; i++) {
	speciesLinks.push(<a style={{ cursor: 'pointer' }} href={'/species/'+species[i].scientific_name}>{species[i].scientific_name+' '}</a>);
  }
  if (species.length === 0) {
		speciesLinks.push(<>{no_info}</>)
	}
  speciesLinks.push(<br/>)

  const habitatLinks = [];
  for (let i = 0; i < habitats.length; i++) {
	habitatLinks.push(<a style={{ cursor: 'pointer' }} href={'/habitats/'+habitats[i].name}>{habitats[i].name+' '}</a>);
  }
  if (habitats.length === 0) {
		habitatLinks.push(<>{no_info}</>)
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
		Total Population: {props.country.total_pop ? props.country.total_pop : no_info}<br/>
		Capital: {props.country.capital ? props.country.capital : "none"}<br/>
		Region: {props.country.region ? props.country.region : "none"}<br/>
		Subregion: {props.country.subregion ? props.country.subregion : "none"}<br/>
		Latitude: {props.country.latitude ? props.country.latitude : no_info }&deg;<br/>
		Longitude: {props.country.longitude ? props.country.longitude : no_info}&deg;<br/>
		Area: {props.country.area ? props.country.area : no_info} km&sup2;<br/>
		Gini Index: {props.country.gini_index ? props.country.gini_index : "none"}<br/>
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