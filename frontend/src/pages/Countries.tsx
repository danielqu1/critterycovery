import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import CountryTable from '../components/Tables/CountryTable';
import CountryModal from '../components/Modal/CountryModal';
import PaginationMain from '../components/Pagination/Pagination'
import Loading from './Loading';
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
    const [modalShow, setModalShow] = React.useState(false);
    const [country, setCountry] = React.useState(countries[0])
    const [startingCard, setStart] = React.useState(0)
    const [maxCardsShown, setCardsShown] = React.useState(10)
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
            axios.get("/api/countries").then((response) => {
                setCountries(response.data.countries);
                if(id != null){
                    axios.get("/api/countries/name=" + id).then((response) => {
                        if(response.data != null){
                            setCountry(response.data.country)
                            setModalShow(true)
                        } 
                    })
                }
                setLoading(false);    
        })}, []);
    
    
    if (isLoading) {
        return Loading();
    }

    function update(place : country) {
        history.push(`/countries/${place.name}`)
        setCountry(place)
        setModalShow(true)
    }

    function closeModal(){
        setModalShow(false);
        history.push('/countries');
    }
    
    return(
        <Container>
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
        </Container>
        
    );
}

export default Countries;
