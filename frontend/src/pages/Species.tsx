import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import SpeciesModal from '../components/Modal/SpeciesModal';
import SpeciesDeck from '../components/CardDecks/SpeciesDeck';

import Loading from './Loading';
import NoDATA from './NoDATA';
import axios from 'axios';

import speciesInterface from '../interfaces/species'

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

function Species() {
	const { id } = useParams<{ id: string }>();
	const [animals, setAnimals] = useState(new Array<speciesInterface>());
	const [isLoading, setLoading] = useState(true);
	const [noData, setNoData] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [species, setSpecies] = useState(animals[0])

	let history = useHistory();
	let query = useQuery().get('q')


	history.listen((location, action) => {
		if(location.pathname.match("/species/+.") != null){
			setModalShow(true)
		}
		else{
			setModalShow(false)
		}
	})

	useEffect(() => {
			axios.get("/api/species").then((response) => {
				setLoading(true)
				setAnimals(response.data.species);
				if(id != null){
					axios.get("/api/species/name=" + id).then((response) => {
						if(response.data != null){
							history.replace('/species')
							history.push("/species/" + id)
							setSpecies(response.data.species)
						} 
					}).catch(err => {
						setNoData(true);
					})
				}

				setLoading(false);
		}).catch(err => {
			setNoData(true);
		// eslint-disable-next-line
		})}, []);
	
	if (noData){
		return NoDATA();
	}
	else if (isLoading) {
		return Loading();
	}

	function update(animal:speciesInterface) {
		setSpecies(animal)
		history.push(`/species/${animal.scientific_name}`)
	}

	function closeModal(){
		history.goBack();
	}

	return(
		<Container>
			<SpeciesModal
				species={species}
				show={modalShow}
				onHide={() => closeModal()}
			/>
			<Row>
				<Container style={{textAlign:'center', padding: '2% 0', marginTop: '3%', borderTop: '.25rem dotted grey', borderBottom: '.25rem dotted grey'}}>
					<h1 style={{fontWeight:'bolder'}}>Species</h1>
				</Container>
			</Row>
			<Row>
				<SpeciesDeck
					species={animals}
					update={update}
					query={query}/>
			</Row>
		</Container>
		
	);
}

export default Species;
