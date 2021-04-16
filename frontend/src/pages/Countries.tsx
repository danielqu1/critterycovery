import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import CountryTable from '../components/Tables/CountryTable';
import CountryModal from '../components/Modal/CountryModal';
import { Input } from 'antd'
import 'antd/dist/antd.css'
import Loading from './Loading';
import axios from 'axios'

interface country {
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

const { Search } = Input;

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Countries(props: any) {
    const offset = 3;
    const { id } = useParams<{ id: string }>();
    const [countries, setCountries] = React.useState(new Array<country>());
    const [isLoading, setLoading] = React.useState(true);
    const [modalShow, setModalShow] = React.useState(false);
    const [country, setCountry] = React.useState(countries[0])
    const [searchVal, setSearchVal] = React.useState("");
    let history = useHistory();
    let query = useQuery().get('q')

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
            if (id != null) {
                axios.get("/api/countries/name=" + id).then((response) => {
                    if (response.data != null) {
                        setCountry(response.data.country)
                        setModalShow(true)
                    }
                }).catch(err => {
                    //DO NOTHING
                })
            }

            if (query){
                setSearchVal(query)
            }
            setLoading(false);
        })
    }, []);


    if (isLoading) {
        return Loading();
    }

    function update(place: country) {
        history.push(`/countries/${place.name}`)
        setCountry(place)
        setModalShow(true)
    }

    function closeModal() {
        setModalShow(false);
        history.push('/countries');
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
