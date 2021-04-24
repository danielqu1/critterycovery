import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import SpeciesModal from '../components/Modal/SpeciesModal';
import SpeciesDeck from '../components/CardDecks/SpeciesDeck';
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

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Species() {
	const {id} = useParams();
	const [animals, setAnimals] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [modalShow, setModalShow] = useState(false);
	const [species, setSpecies] = useState(animals[0])

	let history = useHistory();
	let query = useQuery().get('q')

	useEffect(() => {
		return () => {
			if (history.action === "POP") {
				setModalShow(false);
			}
			else if (history.action === "PUSH") {
				setModalShow(true);
			}
		};
	}, [history.action])

	useEffect(() => {
			axios.get("/api/species").then((response) => {
				setLoading(true)
				setAnimals(response.data.species);
				if(id != null){
					axios.get("/api/species/name=" + id).then((response) => {
						if(response.data != null){
							setSpecies(response.data.species)
							setModalShow(true)
						} 
					}).catch(err => {
						//DO NOTHING
					})
				}

				setLoading(false);
		// eslint-disable-next-line
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
