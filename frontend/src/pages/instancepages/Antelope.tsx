import React from 'react';
import { Nav } from 'react-bootstrap';
import img from '../speciesPhotos/antelope.jpg';

function Antelope() {
    return(
        <div className="text-center">
            <h1>Antelope</h1>
            <img src={img}/>
            <p>
                bodyMass: 430 lbs <br />
                length: 9.7 <br />
                height: 4.6 <br />
                number left: 71000 <br />
                scientific name: Antilocapra americana <br />
                located in: <Nav.Link href='/countries/Argentina'>Argentina</Nav.Link>
                habitat: <Nav.Link href='/habitats/Desert'>Desert</Nav.Link>
            </p>
        </div>
    )
}

export default Antelope;