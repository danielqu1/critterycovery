import {useState, useEffect} from 'react'; 
import {Modal, Button, Container, Col, Row, ListGroup} from 'react-bootstrap' 
import axios from 'axios'
import { Image } from 'antd';

import loadGIF from '../../images/loading.gif'

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

	useEffect(() => {
		if(props.habitat != null){
			axios.get('/api/countries/alpha3_code='+props.habitat.countries).then((response) => {
			setCountry(response.data.country);
			})
		}
	}, [props.habitat]);

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

	const translateColor:any = 
		{
			true: '#93ff68',
			false: '#ff8368',
			null: '#bcbcbc'
		}
	
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
								fallback="data:image/png;base64,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"
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