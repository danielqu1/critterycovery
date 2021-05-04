import {useEffect, useState} from 'react'; 
import {Modal, Button, Container, Col, Row, ListGroup} from 'react-bootstrap' 
import axios from 'axios'
import { Image } from 'antd';

import loadGIF from '../../images/loading.gif'

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
	useEffect(() => {
	setSpecies(new Array<species>())
	if(props.country != null){
		axios.get('/api/countries/species/name='+props.country.name).then((response) => {
		setSpecies(response.data.species);
		})
	}
	}, [props.country]);

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
								fallback="data:image/png;base64,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"
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