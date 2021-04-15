import React from 'react'; 
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

function prettyEntries(props: any) {
	const properties: string[] = ["_class", "_order", "common_name", "family", "genus", "kingdom", "phylum", "population_trend", "scientific_name", "subspecies", "subpopulations", "population_trend", "marine", "freshwater", "terrestrial", "rationale", "geographic_range", "population", "habitat", "threats", "conservation_measures" ];

	for (let property of properties) {
		props.species[property] = (props.species[property]) ? props.species[property] : NA;      // convert blanks to unknown
	}

	for (let property of properties) {

		let text = props.species[property]

		if ((typeof text == "string") && (text.length < 20) && text != NA) {
			let first = text.charAt(0);
			let lower = text.toLowerCase().substring(1);
			props.species[property] = first + lower;
		}
    }

    if (props.species.common_name == NA) {
        if (props.species.scientific_name == "Achatinella taeniolata") {
            props.species.common_name = "O'ahu tree snail";
        }
    }

}

function SpeciesModal(props: any) {

	const [countries, setCountries] = React.useState(new Array<countries>());
    const [habitats, setHabitats] = React.useState(new Array<habitats>());

	React.useEffect(() => {
		setCountries(new Array<countries>())
		if(props.species != null) {
			axios.get('/api/species/countries/name='+props.species.scientific_name).then((response) => {
				setCountries(response.data.countries);
			})
		}
	}, [props.species]);

	React.useEffect(() => {
		setHabitats(new Array<habitats>())
		if(countries != null) {
			for (let i = 0; i < countries.length; i++) {
				axios.get('/api/countries/habitats/name='+countries[i].country).then((response) => {
					setHabitats(habitats.concat(response.data.habitats));
				})
			}
		}
    }, [countries]);
  
	if(props.species == null){
		return(<a></a>)
    }

    //prettyEntries(props);

	const countryLinks = [];
	for (let i = 0; i < countries.length; i++) {
		countryLinks.push(<a style={{ cursor: 'pointer' }} href={'/countries/'+countries[i].country}>{countries[i].country+' '}</a>);
	}
	countryLinks.push(<br/>)

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
					{props.species.common_name != NA ? props.species.common_name : props.species.scientific_name}
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
				

				Countries: <br /> {countryLinks ? countryLinks : "Unknown"} <br/>
				Habitats: <br /> {habitatLinks ? habitatLinks : "Unknown"} <br/>
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