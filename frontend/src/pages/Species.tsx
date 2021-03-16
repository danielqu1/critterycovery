import React from 'react';
import { CardDeck } from 'react-bootstrap';
import SpeciesCard from './SpeciesCard';

import antelope from './speciesPhotos/antelope.jpg';
import zebra from './speciesPhotos/zebra.jpg';
import jaguar from './speciesPhotos/jaguar.jpg';

type animal = {
    name: string;
    bodyMass: string;
    length: string;
    height: string;
    num: number;
    taxa: string;
}

function Species() {

    const animals: animal[] = [
        {
            name: "Antelope",
            bodyMass: "430 lbs",
            length: "9.7",
            height: "4.6",
            num: 71000,
            taxa: "Antilocapra americana"
        },
        {
            name: "Zebra",
            bodyMass: "800 lbs",
            length: "5.8",
            height: "4.8",
            num: 9000,
            taxa: "Equus zebra Linnaeus"
        },
        {
            name: "Jaguar",
            bodyMass: "180 lbs",
            length: "5.2",
            height: "2.3",
            num: 64000,
            taxa: "Panthera onca"
        }
    ]

    return(
        <div>
            <h1>Species</h1>
            <CardDeck>
                <SpeciesCard animal={animals[0]} photo={antelope}></SpeciesCard>
                <SpeciesCard animal={animals[1]} photo={zebra}></SpeciesCard>
                <SpeciesCard animal={animals[2]} photo={jaguar}></SpeciesCard>
            </CardDeck>
        </div>
    );
}

export default Species;
