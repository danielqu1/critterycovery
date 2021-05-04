// Modal acts as an instance page for habitats. Displays information and media for habitats
import {useState, useEffect} from 'react'; 
import {Modal, Button, Container, Col, Row, ListGroup} from 'react-bootstrap' 
import axios from 'axios'
import { Image } from 'antd';

import loadGIF from '../../images/loading.gif'
import defaultImage from '../../data/DefaultImage'

interface species{
	scientific_name: string;
}

interface country{
	name: string;
	alpha3_code: string;
}

const no_info = "information not available"

function HabitatModal(props: any) {
	const country_default : country = {name: 'United States of America', alpha3_code: 'USA'}
	const [species, setSpecies] = useState(new Array<species>());
	const [country, setCountry] = useState(country_default);

	// Loads the connection data between habitat and country
	useEffect(() => {
		if(props.habitat != null){
			axios.get('/api/countries/alpha3_code='+props.habitat.countries).then((response) => {
			setCountry(response.data.country);
			})
		}
	}, [props.habitat]);

	// Loads the connection data between habitat and species
	useEffect(() => {
		setSpecies(new Array<species>())
		if(props.habitat != null){
			axios.get('/api/countries/species/name='+country.name).then((response) => {
			setSpecies(response.data.species);
			})
		}
	}, [country, props.habitat]);

	if(props.habitat == null){
		return(<></>)
	}

	// Build lists of connections with links
	const speciesLinks = [];
	for (let i = 0; i < species.length; i++) {
		speciesLinks.push(<a style={{ cursor: 'pointer' }} href={'/species/'+species[i].scientific_name}>{species[i].scientific_name+' '}</a>);
	}
	if (species.length === 0) {
		speciesLinks.push(<>{no_info}</>)
	}
	speciesLinks.push(<br/>)

	let countryLinks = <></>;
	if(country !== null){
	countryLinks = (<a style={{ cursor: 'pointer' }} href={'/countries/'+country.name}>{country.name+' '}</a>)
	} else {
	countryLinks = <>{no_info}</>
	}

	// Array that translates string values into colors
	// useful for making boxes with true in them green
	const translateColor:any = 
		{
			true: '#93ff68',
			false: '#ff8368',
			null: '#bcbcbc'
		}
	
	// function that applies the coloring array to the data
	function colorTranslator(data : any){
		if(translateColor[data]){
			return translateColor[data]
		}
		return '#bcbcbc'
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
			<Container style={{marginBottom: '4%'}}>
				<Row xs={1} lg={2}>
					<Col style={{paddingRight:'2%'}}>
						<Row style={{marginBottom:'4%'}}>
							<Image 
								width='100%'
								height='100%'
								style={{objectFit:'cover'}}
								alt={"Image of "+props.habitat.name}
								src={props.habitat.image_link}
								placeholder={
									<Image
									preview={false}
									src={loadGIF}
									width='100%'
									height='100%'
									style={{objectFit:'cover'}}
									alt="loading gif"
									/>
								}
								preview={false}
								fallback={defaultImage()}
							/><br/>
						</Row>
						<Row>
							<ListGroup>
								<ListGroup.Item style={{backgroundColor:'#FFB37C'}}><span style={{ float: "left" }}>ID: {props.habitat.id.toString()}</span></ListGroup.Item>
								<ListGroup.Item style={{backgroundColor: colorTranslator(props.habitat.marine)}}><span style={{ float: "left" }}>Marine: {props.habitat.marine.toString()}</span></ListGroup.Item>
								<ListGroup.Item style={{backgroundColor:'#68faff'}}><span style={{ float: "left" }}>Water Area: {props.habitat.reported_marine_area.toString()} km&sup2;</span></ListGroup.Item>
								<ListGroup.Item style={{backgroundColor:'#68ffa2'}}><span style={{ float: "left" }}>Land Area: {props.habitat.reported_terrestrial_area.toString()} km&sup2;</span></ListGroup.Item>
								<ListGroup.Item style={{backgroundColor:'#fff868'}}><span style={{ float: "left" }}>IUCN Category: {props.habitat.iucn_category.toString()}</span></ListGroup.Item>
								<ListGroup.Item style={{backgroundColor:'#689dff'}}><span style={{ float: "left" }}>Designation: {props.habitat.designation_name ? props.habitat.designation_name : no_info}</span></ListGroup.Item>
							</ListGroup>
						</Row>
					</Col>
					<Col style={{paddingLeft:'6%'}}>
						<Row>
							<ListGroup>
								<ListGroup.Item style={{backgroundColor: '#cdedff'}}><span style={{ float: "left" }}>Country: {countryLinks}</span></ListGroup.Item>
								<ListGroup.Item style={{backgroundColor: '#FFF8B4'}}><span style={{ float: "left" }}>Species: {speciesLinks}</span></ListGroup.Item>
							</ListGroup>
						</Row>
						<Row style={{marginTop:'2%'}}>
							<iframe title="Map of Country"
								width="100%"
								height='400px'
								style={{border: 0}}
								loading="lazy"
								allowFullScreen
								src={props.habitat.embedded_map_link}>
							</iframe><br/>
							More Information: <a href={props.habitat.link}>{props.habitat.link}</a>
						</Row>
					</Col>
				</Row>
			</Container>
				
		</Modal.Body>
		<Modal.Footer>
		<Button onClick={props.onHide}>Close</Button>
		</Modal.Footer>
	</Modal>
	);
}

export default HabitatModal;