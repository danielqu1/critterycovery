import {useState, useEffect, ReactElement,} from 'react'; 
import {Modal, Button, Container, Row, Col, ListGroup } from 'react-bootstrap'
import axios, { AxiosPromise } from 'axios'
import { Typography, Image } from 'antd';

import loadGIF from '../../images/loading.gif'

const { Title } = Typography;

interface countries {
	country: string;
	alpha3_code: string;
}

const no_info = "information not available"

function SpeciesModal(props: any) {

	const [countries, setCountries] = useState(new Array<countries>());
	const [habitats, setHabitats] = useState(new Array<string>());
	const [habitatLinks, setHabitatLinks] = useState(new Array<ReactElement>())

	useEffect(() => {
		setCountries(new Array<countries>())
		if(props.species != null) {
			axios.get('/api/species/countries/name='+props.species.scientific_name).then((response) => {
				setCountries(response.data.countries);
			})
		}
	}, [props.species]);

	useEffect(() => {
		let tempHabitats = new Array<string>()
		if(countries !== null) {
			let habitatRequests = new Array<AxiosPromise>()
			for (let i = 0; i < countries.length; i++) {
				habitatRequests.push(axios.get('/api/countries/habitats/name='+countries[i].country))
			}
			Promise.all(habitatRequests).then((responses) => {
				for (let response of responses){
					let respHabitats = response.data.habitats
					for(let habitat of respHabitats){
						tempHabitats.push(habitat.name)
					}
				}
			})
		}
		setHabitats(tempHabitats)
	// eslint-disable-next-line
	}, [countries]);

	useEffect(() => {
		makeLinks()
	})
  
	if(props.species == null){
		return(<></>)
	}
	function makeLinks(){
		const links = [];
		for (let i = 0; i < habitats.length; i++) {
			links.push(<a style={{ cursor: 'pointer' }} href={'/habitats/'+habitats[i]}>{habitats[i]+' '}</a>);
		}
		if (habitats.length === 0) {
			links.push(<>{no_info}</>)
		}
		links.push(<br/>)
		setHabitatLinks(links)
	}

	const countryLinks = [];
	for (let i = 0; i < countries.length; i++) {
		countryLinks.push(<a style={{ cursor: 'pointer' }} href={'/countries/'+countries[i].country}>{countries[i].country+' '}</a>);
	}
	if (countries.length === 0) {
		countryLinks.push(<>{no_info}</>)
	}
	countryLinks.push(<br/>)
  
	const translateColor:any = 
		{
			true: '#93ff68',
			false: '#ff8368',
			'Stable': '#fffd64',
			'Increasing': '#93ff68',
			'Decreasing': '#ff8368',
			'Unknown': '#bcbcbc',
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
					{props.species.common_name ? props.species.common_name : props.species.scientific_name}
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
									alt={"Image of "+props.species.name}
									src={props.species.image_link}
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
									<ListGroup.Item style={{backgroundColor:'#ff8368'}}><span style={{ float: "left" }}>Kingdom: {props.species.kingdom}</span></ListGroup.Item>
									<ListGroup.Item style={{backgroundColor:'#fff868'}}><span style={{ float: "left" }}>Phylum: {props.species.phylum}</span></ListGroup.Item>
									<ListGroup.Item style={{backgroundColor:'#93ff68'}}><span style={{ float: "left" }}>Class: {props.species._class}</span></ListGroup.Item>
									<ListGroup.Item style={{backgroundColor:'#68ffa2'}}><span style={{ float: "left" }}>Order: {props.species._order}</span></ListGroup.Item>
									<ListGroup.Item style={{backgroundColor:'#68faff'}}><span style={{ float: "left" }}>Family: {props.species.family}</span></ListGroup.Item>
									<ListGroup.Item style={{backgroundColor:'#689dff'}}><span style={{ float: "left" }}>Scientific Name: {props.species.scientific_name}</span></ListGroup.Item>
									<ListGroup.Item style={{backgroundColor:'#9f68ff'}}><span style={{ float: "left" }}>Subspecies: {props.species.subspecies ? props.species.subspecies : "none"}</span></ListGroup.Item>
								</ListGroup>
							</Row>
						</Col>
						<Col style={{paddingLeft:'6%'}}>
							<Row style={{marginBottom:'4%'}}>
								<ListGroup>
									<ListGroup.Item style={{backgroundColor: '#FFB37C'}}><span style={{ float: "left" }}>Subpopulations: {props.species.subpopulations ? props.species.subpopulations : "none"}</span></ListGroup.Item>
									<ListGroup.Item style={{backgroundColor: colorTranslator(props.species.population_trend)}}><span style={{ float: "left" }}>Population Trend: {props.species.population_trend ? props.species.population_trend : no_info}</span></ListGroup.Item>
									<ListGroup.Item style={{backgroundColor: colorTranslator(props.species.marine)}}><span style={{ float: "left" }}>Marine: {props.species.marine.toString()}</span></ListGroup.Item>
									<ListGroup.Item style={{backgroundColor: colorTranslator(props.species.freshwater)}}><span style={{ float: "left" }}>Freshwater: {props.species.freshwater.toString()}</span></ListGroup.Item>
									<ListGroup.Item style={{backgroundColor: colorTranslator(props.species.terrestrial)}}><span style={{ float: "left" }}>Terrestrial: {props.species.terrestrial.toString()}</span></ListGroup.Item>
								</ListGroup>
							</Row>
							<Row>
								<ListGroup>
									<ListGroup.Item style={{backgroundColor: '#cdedff'}}><span style={{ float: "left" }}>Countries: {countryLinks}</span></ListGroup.Item>
									<ListGroup.Item style={{backgroundColor: '#FFF8B4'}}><span style={{ float: "left" }}>Habitats: {habitatLinks}</span></ListGroup.Item>
								</ListGroup>
							</Row>
						</Col>
					</Row>
				</Container>

				<ListGroup variant='flush'>
					<ListGroup.Item><Title level={5}>Rationale:</Title><br/><div dangerouslySetInnerHTML={{ __html: props.species.rationale ? props.species.rationale : no_info }}></div></ListGroup.Item>
					<ListGroup.Item><Title level={5}>Geographic Range:</Title><br/><div dangerouslySetInnerHTML={{ __html: props.species.geographic_range ? props.species.geographic_range : no_info }}></div></ListGroup.Item>
					<ListGroup.Item><Title level={5}>Population:</Title><br/><div dangerouslySetInnerHTML={{ __html: props.species.population ? props.species.population : no_info }}></div></ListGroup.Item>
					<ListGroup.Item><Title level={5}>Habitat Description:</Title><br/><div dangerouslySetInnerHTML={{ __html: props.species.habitat ? props.species.habitat : no_info}}></div></ListGroup.Item>
					<ListGroup.Item><Title level={5}>Threats:</Title><br/><div dangerouslySetInnerHTML={{ __html: props.species.threats ? props.species.threats : no_info }}></div></ListGroup.Item>
					<ListGroup.Item><Title level={5}>Conservation Measures:</Title><br/><div dangerouslySetInnerHTML={{ __html: props.species.conservation_measures ? props.species.conservation_measures : no_info }}></div></ListGroup.Item>
					<ListGroup.Item><Title level={5}>Taxonomic Notes:</Title><br/><div dangerouslySetInnerHTML={{ __html: props.species.taxonomic_notes ? props.species.taxonomic_notes : no_info }}></div></ListGroup.Item>
				</ListGroup>
				
				
				
				
				
				

			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default SpeciesModal;