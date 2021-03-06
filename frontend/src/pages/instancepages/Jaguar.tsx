import React from 'react';
import { Nav } from 'react-bootstrap';
import img from '../speciesPhotos/jaguar.jpg';

function Jaguar() {
    return(
        <div className="text-center">
            <h1>Jaguar</h1>
            <img src={img}/>
            <p>
                bodyMass: 180 lbs <br />
                length: 5.2 <br />
                height: 2.3 <br />
                number left: 64000 <br />
                scientific name: Panthera onca <br />
                located in: <Nav.Link href='/countries/Germany'>Germany</Nav.Link>
                habitat: <Nav.Link href='/habitats/Forest'>Forest</Nav.Link>
            </p>
        </div>
    )
}

export default Jaguar;