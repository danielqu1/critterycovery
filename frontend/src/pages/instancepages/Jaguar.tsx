import React from 'react';
import { Nav } from 'react-bootstrap';
import img from '../speciesPhotos/jaguar.jpg';

function Jaguar() {
    return(
        <div className="text-center">
            <h1>Jaguar</h1>
            <img src={img} alt="Four legged spotted animal"/>
            <p>
                Body Mass: 180 lbs <br />
                Length: 5.2 <br />
                height: 2.3 <br />
                Number left: 64000 <br />
                Scientific name: Panthera onca <br />
                Located in: <Nav.Link href='/countries/Germany'>Germany</Nav.Link>
                Habitat: <Nav.Link href='/habitats/Forest'>Forest</Nav.Link>
            </p>
        </div>
    )
}

export default Jaguar;