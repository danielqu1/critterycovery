import React from 'react';
import { Pagination, Button, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import { useParams, useLocation, Link } from 'react-router-dom';
import SpeciesCard from '../components/Cards/SpeciesCard';
import SpeciesModal from '../components/Modal/SpeciesModal';
import jaguar from './speciesPhotos/jaguar.jpg';
import axios from 'axios'

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
    let location = useLocation();

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
        })}, []);
    
    
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    function update(animal : species) {
        setSpecies(animal)
        setModalShow(true)
    }

    const speciesCards = [];
    for (let i = startingCard; i < Math.min(startingCard + maxCardsShown, animals.length); i++) {
        speciesCards.push(<Col><a style={{ cursor: 'pointer' }} onClick={() => update(animals[i])}><Link
        to={{
          pathname: `/species/${animals[i].scientific_name}`,
          state: { background: location }
        }}
      ><SpeciesCard animal={animals[i]} photo={jaguar}></SpeciesCard></Link></a></Col>);
    }

    const pageButtons = [];
    const totalPages = Math.ceil(animals.length/maxCardsShown);
    const activePage = Math.floor(startingCard/maxCardsShown + 1);
    if (activePage - offset > 0){
        pageButtons.push(<Pagination.Item onClick={() => setStart(0)}>{1}</Pagination.Item>)
        if (activePage - offset - 1 > 0){
            pageButtons.push(<Pagination.Ellipsis/>)
        }
    }
    for (let i = activePage - offset + 1; i <= startingCard/maxCardsShown + offset; i++) {
        if(i > 0 && i < totalPages + 1){
            if(i === activePage){
                pageButtons.push(<Pagination.Item active>{i}</Pagination.Item>)
            }
            else{
                pageButtons.push(<Pagination.Item onClick={() => setStart((i-1) * maxCardsShown)}>{i}</Pagination.Item>)
            }
        }
    }
    if (activePage + offset < totalPages){
        if (activePage + offset - 1 < totalPages){
            pageButtons.push(<Pagination.Ellipsis/>)
        }
        pageButtons.push(<Pagination.Item onClick={() => setStart(Math.floor(animals.length / maxCardsShown) * maxCardsShown)}>{totalPages}</Pagination.Item>)
        
    }

    return(
        <div>
            <SpeciesModal
                species={species}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />

            <Container fluid className="justify-content-md-center">
                <Row>
                    <h1>{animals.length} Species. {maxCardsShown} per page</h1>
                </Row>
                <Row xs={1} sm={2} md={3} lg={4} xl={5}>
                    {speciesCards}
                </Row>
                <Row className="justify-content-md-center" style={{paddingTop: '1%'}}>
                    <Col sm={8} md="auto">
                        <Pagination>
                            <Pagination.First onClick={() => setStart(0)}/>
                            <Pagination.Prev onClick={() => setStart(Math.max(0, startingCard - maxCardsShown))}/>
                            {pageButtons}
                            <Pagination.Next onClick={() => setStart(Math.min((Math.floor(animals.length / maxCardsShown) * maxCardsShown), startingCard + maxCardsShown))}/>
                            <Pagination.Last onClick={() => setStart(Math.floor(animals.length / maxCardsShown) * maxCardsShown)}/>
                        </Pagination>
                    </Col>
                    <Col sm={3} lg="2">
                        <ButtonGroup>
                            <Button variant="outline-primary" onClick={() => setCardsShown(10)}>10</Button> 
                            <Button variant="outline-primary" onClick={() => setCardsShown(20)}>20</Button> 
                            <Button variant="outline-primary" onClick={() => setCardsShown(50)}>50</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Container>
        </div>
        
    );
}

export default Species;
