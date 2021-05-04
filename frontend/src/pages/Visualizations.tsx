import React from 'react'
import { Container, Row } from 'react-bootstrap';

function Visualizations() {
    return (
        <Container fluid style={{ width: '70%' }}>
            <Row className='justify-content-md-center spacing' style={{borderTop:'.25rem dotted grey', borderBottom:'.25rem dotted grey'}}>
                <h1 style={{ fontWeight: 'bolder' }}>Our Visualizations</h1>
            </Row>
            <Row className='justify-content-md-center spacing' style={{marginBottom:'15%'}}>
                <iframe width="100%" height="1000" style={{border:'none'}} src="https://observablehq.com/embed/@sahithi-golkonda/regions-subregions-and-countries-by-land-area-zoomable?cells=header%2Cchart" />
                <iframe width="100%" height="580" style={{border:'none'}} src="https://observablehq.com/embed/@sahithi-golkonda/countries-distribution?cells=header%2Cmap" />
                <iframe width="100%" height="710" style={{border:'none'}} src="https://observablehq.com/embed/@sahithi-golkonda/endangered-species-by-class?cells=header%2Cchart" />
                <iframe width="100%" height="900" style={{border:'none'}} src="https://observablehq.com/embed/@sahithi-golkonda/habitats-per-country-bar-chart?cells=header%2Cchart" />
            </Row>
            
            <Row className='justify-content-md-center spacing' style={{borderTop:'.25rem dotted grey', borderBottom:'.25rem dotted grey'}}>
                <h1 style={{ fontWeight: 'bolder' }}>Provider Visualizations</h1>
            </Row>
            
            <Row className='justify-content-md-center spacing'>
                <iframe width="100%" height="800" style={{border:'none'}} src="https://observablehq.com/embed/@sahithi-golkonda/incidents-per-austin-district-bar-chart?cells=header%2Cviewof+order%2Cchart" />
                <iframe width="100%" height="870" style={{border:'none'}} src="https://observablehq.com/embed/@sahithi-golkonda/types-of-restaurants-in-austin?cells=header%2Cchart" />
                <iframe width="100%" height="963" style={{border:'none'}} src="https://observablehq.com/embed/@sahithi-golkonda/distance-to-city-center-vs-price-for-austin-hotels?cells=header%2Cviewof+selection%2CselectOutput" />
            </Row>
        </Container>
    )
}

export default Visualizations
