import React from 'react';
import { Nav } from 'react-bootstrap';
import img from '../habitatPhotos/grassland.jpeg';

function Grassland() {
    return(
        <div className="text-center">
            <h1>Grassland</h1>
            <img src={img}/>
            <p>
                Rain: 30 in <br/>
                Temperature: 60-70 degrees F <br/>
                Sunlight per day: 11.86 hours <br/>
                Percent of earth: 20-40 <br/>
                Habitat Code: 2.A <br/>
                In country: <Nav.Link href='/countries/Australia'>Australia</Nav.Link> <br/>
                Includes endangered species: <Nav.Link href='/species/Zebra'>Zebra</Nav.Link>
            </p>
        </div>
    )
}

export default Grassland;