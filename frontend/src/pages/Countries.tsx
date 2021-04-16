import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
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

function Countries(props: any) {
    const offset = 3;
    const { id } = useParams<{ id: string }>();
    const [countries, setCountries] = React.useState(new Array<country>());
    const [isLoading, setLoading] = React.useState(true);
    const [modalShow, setModalShow] = React.useState(false);
    const [country, setCountry] = React.useState(countries[0])
    const [searchVal, setSearchVal] = React.useState("");
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
            if (id != null) {
                axios.get("/api/countries/name=" + id).then((response) => {
                    if (response.data != null) {
                        setCountry(response.data.country)
                        setModalShow(true)
                    }
                })
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
                    <h1>Countries.</h1>
                </Row>
                <Row>
                    <Search
                        onChange={(e) => setSearchVal(e.target.value)}
                        placeholder="Search"
                        enterButton
                        style={{
                            position: "sticky",
                            top: "0",
                            left: "0",
                            width: "200px",
                            marginTop: "2vh"
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
