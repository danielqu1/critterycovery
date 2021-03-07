import React from 'react';
import { Nav } from 'react-bootstrap';
import img from '../countryPhotos/australia.jpeg';

function Australia() {
    return(
        <div className="text-center">
            <h1>Australia</h1>
            <img src={img}/>
            <p>
                Capital: Canberra <br/>
                Location: Oceania <br/>
                Population: 24117360 <br/>
                Area: 2.97 million mi^2 <br/>
                GDP: 1.34 trillion <br/>
                Has habitat: <Nav.Link href='/habitats/Grassland'>Grassland</Nav.Link> <br/>
                Includes endangered species: <Nav.Link href='/species/Zebra'>Zebra</Nav.Link>
            </p>
        </div>
    )
}

export default Australia;