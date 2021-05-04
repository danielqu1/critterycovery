import React from 'react'
import {Container} from 'react-bootstrap';

function ProviderVisualizations() {
    return (
        <Container fluid style={{ width: '50%' }}>
            <br />
            <h1 style={{ fontWeight: 'bolder' }}>Provider Visualizations</h1>
            <iframe width="100%" height="800" frameBorder="0" src="https://observablehq.com/embed/@sahithi-golkonda/incidents-per-austin-district-bar-chart?cells=header%2Cviewof+order%2Cchart" />
            <iframe width="100%" height="870" frameBorder="0" src="https://observablehq.com/embed/@sahithi-golkonda/types-of-restaurants-in-austin?cells=header%2Cchart" />
            <iframe width="100%" height="963" frameBorder="0" src="https://observablehq.com/embed/@sahithi-golkonda/distance-to-city-center-vs-price-for-austin-hotels?cells=header%2Cviewof+selection%2CselectOutput" />
        </Container>
    )
}

export default ProviderVisualizations
