import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import SearchHandler from '../components/Search/SearchHandler'
import {Container, Row} from 'react-bootstrap'
import Loading from './Loading';
import NoDATA from './NoDATA';
import axios from 'axios'

import { Input } from 'antd'

const { Search } = Input

// Loads the query parameter from the url
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

/* Search page for the website
 * Displays search results underneath a searchbar for each model
 * calls searchHandler 3 times (one for each model)
 */
function SearchPage(){
	let query = useQuery().get('q')
	const [isLoading, setLoading] = useState(true);
	const [noData, setNoData] = useState(false);
	const [searchVal, setSearchVal] = useState(query?query:'')
	
	const [species, setSpecies] = useState([]);
	const [habitats, setHabitats] = useState([]);
	const [countries, setCountries] = useState([]);

	// Loads data for each model
	useEffect(() => {
		axios.get("/api/species").then((response) => {
			setSpecies(response.data.species);   
		}).catch(err => {
			setNoData(true);
		})
		axios.get("/api/habitats").then((response) => {
			setHabitats(response.data.habitats);   
		}).catch(err => {
			setNoData(true);
		})
		axios.get("/api/countries").then((response) => {
			setCountries(response.data.countries);   
		}).catch(err => {
			setNoData(true);
		})
		setLoading(false);
	}, []);

	// Displays error if occured
	if (noData){
		return NoDATA();
	}
	else if (isLoading) {
		return Loading();
	}

	return (
		<Container>
			<Row>
				<Container style={{textAlign:'center', padding: '2% 0', marginTop: '3%', borderTop: '.25rem dotted grey', borderBottom: '.25rem dotted grey'}}>
					<h1 style={{fontWeight:'bolder'}}>Search</h1>
				</Container>
			</Row>
			<Row>
				<Container>
					<Row className='justify-content-md-center'>
						<Search
							onChange={(e) => setSearchVal(e.target.value)}
							defaultValue={query?query:''}
							placeholder="Search"
							style={{
								width: '50%',
								height: '100%',
								padding: '1% 0',
							}}
						/>
					</Row>
					<Row>
						<Container style={{textAlign:'center', padding: '1% 0', marginTop: '3%'}}>
							<h1 style={{fontWeight:'bold'}}>Species</h1>
						</Container>
					</Row>
					<SearchHandler data={species} searchVal={searchVal}/>
					<Row>
						<Container style={{textAlign:'center', padding: '1% 0', marginTop: '3%', borderTop: '.25rem dotted grey'}}>
							<h1 style={{fontWeight:'bold'}}>Habitats</h1>
						</Container>
					</Row>
					<SearchHandler data={habitats} searchVal={searchVal}/>
					<Row>
						<Container style={{textAlign:'center', padding: '1% 0', marginTop: '3%', borderTop: '.25rem dotted grey'}}>
							<h1 style={{fontWeight:'bold'}}>Countries</h1>
						</Container>
					</Row>
					<SearchHandler data={countries} searchVal={searchVal}/>
						</Container>
					</Row>
			
		</Container>
	);
}

export default SearchPage;