import React from 'react';
import { Nav } from 'react-bootstrap';
import img from '../habitatPhotos/desert.jpeg';

function Desert() {
    return(
        <div className="text-center">
            <h1>Desert</h1>
            <img src={img} alt="Sandy desert"/>
            <p>
                Rain: 8.03 in <br/>
                Temperature: 117 degrees F <br/>
                Sunlight per day: 8.32 hours <br/>
                Percent of earth: 33 <br/>
                Habitat Code: 3 <br/>
                In country: <Nav.Link href='/countries/Argentina'>Argentina</Nav.Link> <br/>
                Includes endangered species: <Nav.Link href='/species/Antelope'>Antelope</Nav.Link>
            </p>
        </div>
    )
}

export default Desert;