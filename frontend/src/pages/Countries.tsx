import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import CountryTable from '../components/Tables/CountryTable';
import CountryModal from '../components/Modal/CountryModal';
import PaginationMain from '../components/Pagination/Pagination'
import axios from 'axios'

interface country{
    name: string;
	alpha2_code: string;
	alpha3_code: string;
	total_pop: number;
	capital: string;
	region: string;
	subregion: string;
	latitude: number;
	longitude: number;
	area: number;
	gini_index: number;
	flag: string;
}

function Countries(props : any) {
    const offset = 3;
    const {id} = useParams<{ id: string }>();
    const [countries, setCountries] = React.useState(new Array<country>());
    const [isLoading, setLoading] = React.useState(true);
    const [modalShow, setModalShow] = React.useState(id != null);
    const [country, setCountry] = React.useState(countries[0])
    const [startingCard, setStart] = React.useState(0)
    const [maxCardsShown, setCardsShown] = React.useState(10)
    let location = useLocation();
    let history = useHistory();

    React.useEffect(() => {
            axios.get("/api/countries").then((response) => {
                setCountries(response.data.countries);
                if(id != null){
                    axios.get("/api/countries/name=" + id).then((response) => {
                        if(response.data != null){
                            update(response.data.countries);
                        } 
                    })
                }
                setLoading(false);    
        })}, []);
    
    
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    function update(place : country) {
        setCountry(place)
        setModalShow(true)
    }

    function closeModal(){
        history.goBack()
        setModalShow(false)
    }
    
    return(
        <div>
            <CountryModal
                country={country}
                show={modalShow}
                onHide={() => closeModal()}
            />

            <Container fluid className="justify-content-md-center">
                <Row>
                    <h1>{countries.length} Countries. {maxCardsShown} per page</h1>
                </Row>
                <Row>
                    <CountryTable
                        maxCardsShown={maxCardsShown}
                        countries={countries}
                        startingCard={startingCard}
                        update={update}/>
                </Row>
                <PaginationMain 
                    instancesPerPage= {maxCardsShown}
                    totalInstances= {countries.length}
                    startingInstance= {startingCard}
                    offsetPagesShownFromCurrent= {offset}
                    setStartingInstance= {setStart}
                    setInstancesPerPage= {setCardsShown}
                ></PaginationMain>
            </Container>
        </div>
        
    );
}

export default Countries;
