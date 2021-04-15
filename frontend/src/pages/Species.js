import React from 'react';
import { Container, Row, Col, CardColumns } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import SpeciesModal from '../components/Modal/SpeciesModal';
import SpeciesDeck from '../components/CardDecks/SpeciesDeck';
import 'antd/dist/antd.css'
import Loading from './Loading';
import axios from 'axios';

// interface species{
//     common_name: string;
//     scientific_name: string;
//     kingdom: string;
//     phylum: string;
//     _class: string;
//     _order: string;
//     family: string;
//     genus: string;
//     subspecies: string;
//     subpopulations: string;
//     population_trend: string;
//     marine: boolean;
//     freshwater: boolean;
//     terrestrial: boolean;
// 	taxonomic_notes: string;
// 	rationale: string;
// 	geographic_range: string;
// 	population: number;
// 	text_habitat: string;
// 	threats: string;
// 	conservation_measures: string;
// 	image_link: string;
// }

function Species() {
	const {id} = useParams();
	const [animals, setAnimals] = React.useState(new Array());
	const [isLoading, setLoading] = React.useState(true);
	const [modalShow, setModalShow] = React.useState(false);
	const [species, setSpecies] = React.useState(animals[0])
	let history = useHistory();

	React.useEffect(() => {
		return () => {
			if (history.action === "POP") {
				setModalShow(false);
			}
			else if (history.action === "PUSH") {
				setModalShow(true);
			}
		};
	}, [history.action])

	React.useEffect(() => {
			axios.get("/api/species").then((response) => {
				setAnimals(response.data.species);
				if(id != null){
					axios.get("/api/species/name=" + id).then((response) => {
						if(response.data != null){
							setSpecies(response.data.species)
							setModalShow(true)
						} 
					})
				}
				setLoading(false);    
		})}, []);
	
	
	if (isLoading) {
		return Loading();
	}

	function update(animal) {
		history.push(`/species/${animal.scientific_name}`)
		setSpecies(animal)
		setModalShow(true)
	}

	function closeModal(){
		setModalShow(false);
		history.push('/species');
	}

	return(
		<Container>
			<SpeciesModal
				species={species}
				show={modalShow}
				onHide={() => closeModal()}
			/>

			<SpeciesDeck
				species={animals}
				update={update}/>
		</Container>
		
	);
}

export default Species;
