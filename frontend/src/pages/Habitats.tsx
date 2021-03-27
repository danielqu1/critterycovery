import React from 'react';
import { Pagination, Button, ButtonGroup, Container, Table, Row, Col } from 'react-bootstrap';
import { useParams, useLocation, Link } from 'react-router-dom';
import HabitatEntry from '../components/TableEntries/HabitatEntry';
import HabitatModal from '../components/Modal/HabitatModal';
import Pagination_main from '../components/Pagination/Pagination'
import jaguar from './speciesPhotos/jaguar.jpg';
import axios from 'axios'

interface habitat{
    id: number;
    name: string;
    marine: boolean;
    reported_marine_area: number;
    reported_terrestrial_area: number;
    countries: string;
    iucn_category: number;
    designation_name: string;
    designation_id: number;
    link: string;
}

function Habitats() {
    const offset = 3;
    const {id} = useParams<{ id: string }>();
    const [habitats, setHabitats] = React.useState(new Array<habitat>());
    const [isLoading, setLoading] = React.useState(true);
    const [modalShow, setModalShow] = React.useState(id != null);
    const [habitat, setHabitat] = React.useState(habitats[0])
    const [startingCard, setStart] = React.useState(0)
    const [maxCardsShown, setCardsShown] = React.useState(10)
    let location = useLocation();

    React.useEffect(() => {
            axios.get("/api/habitats").then((response) => {
                setHabitats(response.data.habitats);
                if(id != null){
                    axios.get("/api/habitats/name=" + id).then((response) => {
                        if(response.data != null){
                            update(response.data.species);
                        } 
                    })
                }
                setLoading(false);    
        })}, []);
    
    
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    function update(place : habitat) {
        setHabitat(place)
        setModalShow(true)
    }

    const habitatEntries = [];
    for (let i = startingCard; i < Math.min(startingCard + maxCardsShown, habitats.length); i++) {
        habitatEntries.push(<tr><a style={{ cursor: 'pointer' }} onClick={() => update(habitats[i])}><Link
        to={{
          pathname: `/habitats/${habitats[i].name}`,
          state: { background: location }
        }}
      ><HabitatEntry habitat={habitats[i]}></HabitatEntry></Link></a></tr>);
    }

    return(
        <div>
            <HabitatModal
                habitat={habitat}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            <Container fluid className="justify-content-md-center">
                <Row>
                    <h1>{habitats.length} Habitats. {maxCardsShown} per page</h1>
                </Row>
                <Row xs={1} sm={2} md={3} lg={4} xl={5}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Designation</th>
                                <th>Land Area</th>
                                <th>Water Area</th>
                                <th>Countries</th>
                            </tr>
                        </thead>
                        <tbody>
                            {habitatEntries}
                        </tbody>
                    </Table>
                </Row>
                <Pagination_main 
                    instancesPerPage= {maxCardsShown}
                    totalInstances= {habitats.length}
                    startingInstance= {startingCard}
                    offsetPagesShownFromCurrent= {offset}
                    setStartingInstance= {setStart}
                    setInstancesPerPage= {setCardsShown}
                ></Pagination_main>
            </Container>
        </div>
        
    );
}

export default Habitats;
