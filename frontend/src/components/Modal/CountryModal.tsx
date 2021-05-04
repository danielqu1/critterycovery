// Modal acts as an instance page for countries. Displays information and media for countries
import {useEffect, useState} from 'react'; 
import {Modal, Button, Container, Col, Row, ListGroup} from 'react-bootstrap' 
import axios from 'axios'
import { Image } from 'antd';

import loadGIF from '../../images/loading.gif'
import defaultImage from '../../data/DefaultImage'

interface species{
	scientific_name: string;
}

interface habitats{
	name: string;
}

const no_info = "information not available"

function CountryModal(props: any) {
	const [species, setSpecies] = useState(new Array<species>());
	const [habitats, setHabitats] = useState(new Array<habitats>());

	// Loads the connection data between country and species
	useEffect(() => {
	setSpecies(new Array<species>())
	if(props.country != null){
		axios.get('/api/countries/species/name='+props.country.name).then((response) => {
		setSpecies(response.data.species);
		})
	}
	}, [props.country]);

	// Loads the connection data between country and habitat
	useEffect(() => {
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

	// Build lists of connections with links
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
		<Container style={{marginBottom: '4%'}}>
				<Row xs={1} lg={2}>
					<Col style={{paddingRight:'2%'}}>
						<Row style={{marginBottom:'4%'}}>
							<Image 
								width='100%'
								height='100%'
								style={{objectFit:'cover'}}
								alt={"Flag of "+props.country.name}
								src={props.country.flag}
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
								<ListGroup.Item style={{backgroundColor:'#ff8368'}}><span style={{ float: "left" }}>Capital: {props.country.capital ? props.country.capital : "none"}</span></ListGroup.Item>
								<ListGroup.Item style={{backgroundColor:'#FFB37C'}}><span style={{ float: "left" }}>Total Population: {props.country.total_pop ? props.country.total_pop : no_info}</span></ListGroup.Item>
								<ListGroup.Item style={{backgroundColor:'#fff868'}}><span style={{ float: "left" }}>Area: {props.country.area ? props.country.area : no_info} km&sup2;</span></ListGroup.Item>
								<ListGroup.Item style={{backgroundColor:'#689dff'}}><span style={{ float: "left" }}>Gini Index: {props.country.gini_index ? props.country.gini_index : "none"}</span></ListGroup.Item>
								<ListGroup.Item style={{backgroundColor:'#68ffa2'}}><span style={{ float: "left" }}>Region: {props.country.region ? props.country.region : "none"}</span></ListGroup.Item>
								<ListGroup.Item style={{backgroundColor:'#fff868'}}><span style={{ float: "left" }}>Subregion: {props.country.subregion ? props.country.subregion : "none"}</span></ListGroup.Item>
								
							</ListGroup>
						</Row>
					</Col>
					<Col style={{paddingLeft:'6%'}}>
						<Row>
							<ListGroup>
								<ListGroup.Item style={{backgroundColor: '#cdedff'}}><span style={{ float: "left" }}>Species: {speciesLinks}</span></ListGroup.Item>
								<ListGroup.Item style={{backgroundColor: '#FFF8B4'}}><span style={{ float: "left" }}>Habitats: {habitatLinks}</span></ListGroup.Item>
							</ListGroup>
						</Row>
						<Row style={{marginTop:'2%'}}>
							<iframe title="Map of Country"
								width="100%"
								height="400"
								style={{border: 0}}
								loading="lazy"
								allowFullScreen
								src={props.country.embedded_map_link}>
							</iframe> <br/>
							Latitude: {props.country.latitude ? props.country.latitude : no_info }&deg; 
							Longitude: {props.country.longitude ? props.country.longitude : no_info}&deg;<br/>
							Alpha2: {props.country.alpha2_code} Alpha3: {props.country.alpha3_code}<br/>
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

export default CountryModal;