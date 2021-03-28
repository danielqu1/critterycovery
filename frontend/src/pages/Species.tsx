import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import SpeciesCard from '../components/Cards/SpeciesCard';
import SpeciesModal from '../components/Modal/SpeciesModal';
import PaginationMain from '../components/Pagination/Pagination';
import jaguar from './speciesPhotos/jaguar.jpg';
import axios from 'axios';

interface species{
    common_name: string;
    scientific_name: string;
    kingdom: string;
    phylum: string;
    _class: string;
    _order: string;
    family: string;
    genus: string;
    subspecies: string;
    subpopulations: string;
    population_trend: string;
    marine: boolean;
    freshwater: boolean;
    terrestrial: boolean;
}

function Species() {
    const offset = 3;
    const {id} = useParams<{ id: string }>();
    const [animals, setAnimals] = React.useState(new Array<species>());
    const [isLoading, setLoading] = React.useState(true);
    const [modalShow, setModalShow] = React.useState(id != null);
    const [species, setSpecies] = React.useState(animals[0])
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
            axios.get("/api/species").then((response) => {
                setAnimals(response.data.species);
                if(id != null){
                    axios.get("/api/species/name=" + id).then((response) => {
                        if(response.data != null){
                            update(response.data.species);
                        } 
                    })
                }
                setLoading(false);    
        })}, [id]);
    
    
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    function update(animal : species) {
        history.push(`/species/${animal.scientific_name}`)
        setSpecies(animal)
        setModalShow(true)
    }

    function closeModal(){
        history.goBack()
        setModalShow(false)
    }

    const speciesCards = [];
    for (let i = startingCard; i < Math.min(startingCard + maxCardsShown, animals.length); i++) {
        speciesCards.push(<Col><a style={{ cursor: 'pointer' }} onClick={() => update(animals[i])}><SpeciesCard animal={animals[i]} photo={jaguar}></SpeciesCard></a></Col>);
    }

    

    return(
        <div>
            <SpeciesModal
                species={species}
                show={modalShow}
                onHide={() => closeModal()}
            />

            <Container fluid className="justify-content-md-center">
                <Row>
                    <h1>{animals.length} Species. {maxCardsShown} per page</h1>
                </Row>
                <Row xs={1} sm={2} md={3} lg={4} xl={5}>
                    {speciesCards}
                </Row>
                <PaginationMain 
                    instancesPerPage= {maxCardsShown}
                    totalInstances= {animals.length}
                    startingInstance= {startingCard}
                    offsetPagesShownFromCurrent= {offset}
                    setStartingInstance= {setStart}
                    setInstancesPerPage= {setCardsShown}
                ></PaginationMain>
            </Container>
        </div>
        
    );
}

export default Species;
