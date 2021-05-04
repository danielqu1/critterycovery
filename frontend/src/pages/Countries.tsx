import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import CountryTable from '../components/Tables/CountryTable';
import CountryModal from '../components/Modal/CountryModal';
import { Input } from 'antd'
import Loading from './Loading';
import NoDATA from './NoDATA';
import axios from 'axios'

import country from '../interfaces/country'

const { Search } = Input;

// parses the url for ?q=<query>
function useQuery() {
	return new URLSearchParams(useLocation().search);
}

/* Rendering for critterycovery.me/countries page. 
 * Displays a title with a search bar underneath
 * Under that, it loads the table from CountriesTable with built in filters and pagination
 */

function Countries(props: any) {
	const { id } = useParams<{ id: string }>();
	const [countries, setCountries] = useState(new Array<country>());
	const [isLoading, setLoading] = useState(true);
	const [noData, setNoData] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const [country, setCountry] = useState(countries[0])
	const [searchVal, setSearchVal] = useState("");
	let history = useHistory();
	let query = useQuery().get('q')

	//Displays the modal if an instance is expected
	history.listen((location, action) => {
		if(location.pathname.match("/countries/+.") != null){
			setModalShow(true)
		}
		else{
			setModalShow(false)
		}
	})

	//Loads the countries and country instance data if exists
	useEffect(() => {
		axios.get("/api/countries").then((response) => {
			setCountries(response.data.countries);
			if (id != null) {
				axios.get("/api/countries/name=" + id).then((response) => {
					if (response.data != null) {
						setCountry(response.data.country)
						history.replace('/countries')
						history.push("/countries/" + id)
					}
				}).catch(err => {
					setNoData(true);
				})
			}

			if (query){
				setSearchVal(query)
			}
			setLoading(false);
		}).catch(err => {
			setNoData(true);
		})
	// eslint-disable-next-line
	}, []);

	//Displays errors if occur
	if (noData){
		return NoDATA();
	}
	else if (isLoading) {
		return Loading();
	}

	// Changes the data in the modal and displays it
	function update(place: country) {
		setCountry(place)
		history.push(`/countries/${place.name}`)
		
	}

	// Removes the instance from the url and hides modal
	function closeModal() {
		history.goBack()
	}

	return (
		<Container>
			<CountryModal
				country={country}
				show={modalShow}
				onHide={() => closeModal()}
			/>

			<Container fluid className="justify-content-md-center">
				<Row>
					<Container style={{textAlign:'center', padding: '2% 0', marginTop: '3%', borderTop: '.25rem dotted grey', borderBottom: '.25rem dotted grey'}}>
						<h1 style={{fontWeight:'bolder'}}>Countries</h1>
					</Container>
				</Row>
				<Row className='justify-content-md-center'>
					<Search
						onChange={(e) => setSearchVal(e.target.value)}
						defaultValue = {query?query:''}
						placeholder="Search"
						style={{
							width: '50%',
							height: '100%',
							padding: '1% 0',
						}}
					/>
				</Row>
				<Row>
					<CountryTable
						countries={countries}
						update={update} 
						searchVal={searchVal}/>
				</Row>
			</Container>
		</Container>

	);
}

export default Countries;
