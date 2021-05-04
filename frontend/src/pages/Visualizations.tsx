import React from 'react'
import {Container} from 'react-bootstrap';

function Visualizations() {
    return (
        <Container fluid style={{ width: '50%' }}>
            <br />
            <h1 style={{ fontWeight: 'bolder' }}>Our Visualizations</h1>
            <iframe width="100%" height="1000" frameBorder="0" src="https://observablehq.com/embed/@sahithi-golkonda/regions-subregions-and-countries-by-land-area-zoomable?cells=header%2Cchart" />
            <iframe width="100%" height="580" frameBorder="0" src="https://observablehq.com/embed/@sahithi-golkonda/countries-distribution?cells=header%2Cmap" />
            <iframe width="100%" height="710" frameBorder="0" src="https://observablehq.com/embed/@sahithi-golkonda/endangered-species-by-class?cells=header%2Cchart" />
            <iframe width="100%" height="900" frameBorder="0" src="https://observablehq.com/embed/@sahithi-golkonda/habitats-per-country-bar-chart?cells=header%2Cchart" />
        </Container>
    )
}

export default Visualizations
