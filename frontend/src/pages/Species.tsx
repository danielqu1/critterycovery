import React from 'react';
import { CardDeck } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom';
import SpeciesCard from '../components/Cards/SpeciesCard';
import SpeciesModal from '../components/Modal/SpeciesModal';

import antelope from './speciesPhotos/antelope.jpg';
import zebra from './speciesPhotos/zebra.jpg';
import jaguar from './speciesPhotos/jaguar.jpg';

type species = {
    common_name: string;
    scientific_name: string;
    kingdom: string;
    phylum: string;
    _class: string;
    order: string;
    family: string;
    subspecies: string;
    subpopulations: string;
}

function Species() {
    const {id} = useParams<{ id: string }>();
    const [modalShow, setModalShow] = React.useState(id != null);
    let location = useLocation();
    
    const animals: species[] = [
        {
            common_name: 'Cat',
            scientific_name: 'Felis Catus',
            kingdom: 'Animalia',
            phylum: 'Chordata',
            _class: 'Mammalia',
            order: 'Carnivora',
            family: 'Felidae',
            subspecies: 'None',
            subpopulations: 'N/A'
        }];

        const speciesCards = [];
        for (let i = 0; i < animals.length; i++) {
            speciesCards.push(<SpeciesCard animal={animals[i]} photo={jaguar}></SpeciesCard>);
        }

    return(
        <div>
            <h1>Species {id}</h1>
            <CardDeck>
                <ul>{speciesCards}</ul>
            </CardDeck>
            <SpeciesModal
                species={animals[0]}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
        
    );
}
/*
*/
export default Species;
