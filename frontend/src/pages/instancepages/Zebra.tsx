import React from 'react';
import { Nav } from 'react-bootstrap';
import img from '../speciesPhotos/zebra.jpg';

function Zebra() {
    return(
        <div className="text-center">
            <h1>Zebra</h1>
            <img src={img}/>
            <p>
                Body Mass: 800 lbs <br />
                Length: 5.8 <br />
                Height: 4.8 <br />
                Number left: 9000 <br />
                Scientific name: Equus zebra Linnaeus <br />
                Located in: <Nav.Link href='/countries/Australia'>Australia</Nav.Link>
                Habitat: <Nav.Link href='/habitats/Grassland'>Grassland</Nav.Link>
            </p>
        </div>
    )
}

export default Zebra;