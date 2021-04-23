import {useState, useEffect} from 'react'; 
import {Modal, Button, Image, Card, ListGroup } from 'react-bootstrap'
import axios from 'axios'

interface countries {
	country: string;
	alpha3_code: string;
}

interface habitats {
	name: string;
}

const NA = "N/A";

const no_info = "information not available"

function SpeciesModal(props: any) {

	const [countries, setCountries] = useState(new Array<countries>());
    const [habitats, setHabitats] = useState(new Array<habitats>());

	useEffect(() => {
		setCountries(new Array<countries>())
		if(props.species != null) {
			axios.get('/api/species/countries/name='+props.species.scientific_name).then((response) => {
				setCountries(response.data.countries);
			})
		}
	}, [props.species]);

	useEffect(() => {
		setHabitats(new Array<habitats>())
		if(countries !== null) {
			for (let i = 0; i < countries.length; i++) {
				axios.get('/api/countries/habitats/name='+countries[i].country).then((response) => {
					setHabitats(habitats.concat(response.data.habitats));
				})
			}
		}
    }, [countries, habitats]);
  
	if(props.species == null){
		return(<></>)
    }

	const countryLinks = [];
	for (let i = 0; i < countries.length; i++) {
		countryLinks.push(<a style={{ cursor: 'pointer' }} href={'/countries/'+countries[i].country}>{countries[i].country+' '}</a>);
	}
	if (countries.length === 0) {
		countryLinks.push(<>{no_info}</>)
	}
	countryLinks.push(<br/>)

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
					{props.species.common_name !== NA ? props.species.common_name : props.species.scientific_name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Image src={props.species.image_link} rounded fluid style={{width:'50%'}}/><br/>
				Scientific Name: {props.species.scientific_name}<br />

				<Card style={{ width: '60%' }} bg="light green">
					<Card.Body>
						<Card.Title>Taxonomy</Card.Title>
						<ListGroup variant="flush">
							<ListGroup.Item><span style={{ float: "left" }}>Kingdom: {props.species.kingdom}</span></ListGroup.Item>
							<ListGroup.Item><span style={{ float: "left" }}>Phylum: {props.species.phylum}</span></ListGroup.Item>
							<ListGroup.Item><span style={{ float: "left" }}>Class: {props.species._class}</span></ListGroup.Item>
							<ListGroup.Item><span style={{ float: "left" }}>Order: {props.species._order}</span></ListGroup.Item>
							<ListGroup.Item><span style={{ float: "left" }}>Family: {props.species.family}</span></ListGroup.Item>
							<ListGroup.Item><span style={{ float: "left" }}>Genus: {props.species.genus}</span></ListGroup.Item>
							<ListGroup.Item>Taxonomic Notes: <div dangerouslySetInnerHTML={{ __html: props.species.taxonomic_notes }}></div></ListGroup.Item>
						</ListGroup>
					</Card.Body>
				</Card>
				

				Countries: <br /> {countryLinks} <br/>
				Habitats: <br /> {habitatLinks} <br/>
				Subspecies: {props.species.subspecies ? props.species.subspecies : "none"}<br/>
				Subpopulations: {props.species.subpopulations ? props.species.subpopulations : "none"}<br/>
				Population Trend: {props.species.population_trend ? props.species.population_trend : no_info}<br/>
				Marine: {props.species.marine.toString()}<br/>
				Freshwater: {props.species.freshwater.toString()}<br/>
				Terrestrial: {props.species.terrestrial.toString()}<br/>

				Rationale: <br/><div dangerouslySetInnerHTML={{ __html: props.species.rationale ? props.species.rationale : no_info }}></div><br/>
				Geographic Range: <br/><div dangerouslySetInnerHTML={{ __html: props.species.geographic_range ? props.species.geographic_range : no_info }}></div><br/>
				Population: <br/><div dangerouslySetInnerHTML={{ __html: props.species.population ? props.species.population : no_info }}></div><br/>
				Habitat Description: <br/><div dangerouslySetInnerHTML={{ __html: props.species.habitat ? props.species.habitat : no_info}}></div><br/>
				Threats: <br/><div dangerouslySetInnerHTML={{ __html: props.species.threats ? props.species.threats : no_info }}></div><br/>
				Conservation Measures: <br/><div dangerouslySetInnerHTML={{ __html: props.species.conservation_measures ? props.species.conservation_measures : no_info }}></div><br/>

			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default SpeciesModal;