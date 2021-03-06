import React from 'react';
import { Nav } from 'react-bootstrap';
import img from '../speciesPhotos/zebra.jpg';

function Zebra() {
    return(
        <div className="text-center">
            <h1>Zebra</h1>
            <img src={img}/>
            <p>
                bodyMass: 800 lbs <br />
                length: 5.8 <br />
                height: 4.8 <br />
                number left: 9000 <br />
                scientific name: Equus zebra Linnaeus <br />
                located in: <Nav.Link href='/countries/Australia'>Australia</Nav.Link>
                habitat: <Nav.Link href='/habitats/Grassland'>Grassland</Nav.Link>
            </p>
        </div>
    )
}

export default Zebra;