import React from 'react';
import { Nav } from 'react-bootstrap';
import img from '../countryPhotos/germany.jpeg';

function Germany() {
    return(
        <div className="text-center">
            <h1>Germany</h1>
            <img src={img} alt="Map of country in Europe"/>
            <p>
                Capital: Berlin <br/>
                Location: Europe <br/>
                Population: 81770900 <br/>
                Area: 140,000 mi^2 <br/>
                GDP: 3.9 trillion <br/>
                Has habitat: <Nav.Link href='/habitats/Forest'>Forest</Nav.Link> <br/>
                Includes endangered species: <Nav.Link href='/species/Jaguar'>Jaguar</Nav.Link>
            </p>
        </div>
    )
}

export default Germany;