import React from 'react';
import { Nav } from 'react-bootstrap';
import img from '../countryPhotos/argentina.jpeg';

function Argentina() {
    return(
        <div className="text-center">
            <h1>Argentina</h1>
            <img src={img} alt="Map of Argentina"/>
            <p>
                Capital: Buenos Aires <br/>
                Location: Americas <br/>
                Population: 43590400 <br/>
                Area: 1.074 million mi^2 <br/>
                GDP: 450 billion <br/>
                Has habitat: <Nav.Link href='/habitats/Desert'>Desert</Nav.Link> <br/>
                Includes endangered species: <Nav.Link href='/species/Antelope'>Antelope</Nav.Link>
            </p>
        </div>
    )
}

export default Argentina;