import React from 'react';
import { CardDeck, Button } from 'react-bootstrap';
import { useParams, useLocation, Link } from 'react-router-dom';
import SpeciesCard from '../components/Cards/SpeciesCard';
import SpeciesModal from '../components/Modal/SpeciesModal';
import Pagination_main from '../components/Pagination/Pagination'; 
import antelope from './speciesPhotos/antelope.jpg';
import zebra from './speciesPhotos/zebra.jpg';
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
    
    const {id} = useParams<{ id: string }>();
    const [animals, setAnimals] = React.useState(new Array<species>());
    const [isLoading, setLoading] = React.useState(true);
    const [modalShow, setModalShow] = React.useState(id != null);
    const [species, setSpecies] = React.useState(animals[0])
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
    for (let i = 0; i < animals.length; i++) {
        speciesCards.push(<a style={{ cursor: 'pointer' }} onClick={() => update(animals[i])}><Link
        to={{
          pathname: `/species/${animals[i].scientific_name}`,
          state: { background: location }
        }}
      ><SpeciesCard animal={animals[i]} photo={jaguar}></SpeciesCard></Link></a>);
    }
    
    return(
        <div>
            <h1>Species {id}</h1>
            {animals[0].scientific_name}
            <CardDeck>
                {speciesCards}
            </CardDeck>
            <SpeciesModal
                species={species}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Pagination_main /> 
        </div>
        
    );
}
/*
*/
export default Species;
