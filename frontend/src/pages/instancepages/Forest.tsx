import React from 'react';
import { Nav } from 'react-bootstrap';
import img from '../habitatPhotos/forest.jpeg';

function Forest() {
    return(
        <div className="text-center">
            <h1>Forest</h1>
            <img src={img} alt="Many trees"/>
            <p>
                Rain: 80-100 in <br/>
                Temperature: 50 degrees F <br/>
                Sunlight per day: 12 hours <br/>
                Percent of earth: 31 <br/>
                Habitat Code: 4.3 <br/>
                In country: <Nav.Link href='/countries/Germany'>Germany</Nav.Link> <br/>
                Includes endangered species: <Nav.Link href='/species/Jaguar'>Jaguar</Nav.Link>
            </p>
        </div>
    )
}

export default Forest;