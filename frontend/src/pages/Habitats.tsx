import React from 'react';
import { Container, Row } from 'react-bootstrap';
//import BootstrapTable from 'react-bootstrap-table-next';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import HabitatTable from '../components/Tables/HabitatTable';
import HabitatModal from '../components/Modal/HabitatModal';
import PaginationMain from '../components/Pagination/Pagination';
import axios from 'axios';

interface habitat {
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

function Habitats(props : any) {
    const offset = 3;
    const {id} = useParams<{ id: string }>();
    const [habitats, setHabitats] = React.useState(new Array<habitat>());
    const [isLoading, setLoading] = React.useState(true);
    const [modalShow, setModalShow] = React.useState(id != null);
    const [habitat, setHabitat] = React.useState(habitats[0])
    const [startingCard, setStart] = React.useState(0)
    const [maxCardsShown, setCardsShown] = React.useState(10)
    let location = useLocation();
    let history = useHistory();

    React.useEffect(() => {
            axios.get("/api/habitats").then((response) => {
                setHabitats(response.data.habitats);
                if(id != null){
                    axios.get("/api/habitats/name=" + id).then((response) => {
                        if(response.data != null){
                            update(response.data.habitat);
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

    function closeModal(){
        history.goBack()
        setModalShow(false)
    }
    
    return(
        <div>
            <HabitatModal
                habitat={habitat}
                show={modalShow}
                onHide={() => closeModal()}
            />

            <Container fluid className="justify-content-md-center">
                <Row>
                    <h1>{habitats.length} Habitats. {maxCardsShown} per page</h1>
                </Row>
                <Row>
                    <HabitatTable
                        maxCardsShown={maxCardsShown}
                        habitats={habitats}
                        startingCard={startingCard}
                        update={update}/>
                </Row>
                <PaginationMain 
                    instancesPerPage= {maxCardsShown}
                    totalInstances= {habitats.length}
                    startingInstance= {startingCard}
                    offsetPagesShownFromCurrent= {offset}
                    setStartingInstance= {setStart}
                    setInstancesPerPage= {setCardsShown}
                ></PaginationMain>
            </Container>
        </div>
        
    );
}

export default Habitats;
