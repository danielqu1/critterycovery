import React from 'react';
import { Nav } from 'react-bootstrap';
import img from '../speciesPhotos/antelope.jpg';

function Antelope() {
    return(
        <div className="text-center">
            <h1>Antelope</h1>
            <img src={img} alt = "Antelope"/>
            <p>
                Body Mass: 430 lbs <br />
                Length: 9.7 <br />
                Height: 4.6 <br />
                Number left: 71000 <br />
                Scientific name: Antilocapra americana <br />
                Located in: <Nav.Link href='/countries/Argentina'>Argentina</Nav.Link>
                Habitat: <Nav.Link href='/habitats/Desert'>Desert</Nav.Link>
            </p>
        </div>
    )
}

export default Antelope;