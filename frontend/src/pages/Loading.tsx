import React from 'react';
import { Spinner, Container, Row } from 'react-bootstrap'

let remarks:string[] = [
    "Thwarting Deforestation",
    "Sending Cute Animal Piks",
    "Awaiting Critterformation",
    "Exploring the Amazon",
    "Spreading Awareness",
    "Inviting People to Help",
    "Listening to Baby Animals"
]

function Loading() {
    return(
        <Container fluid style={{padding:'15%'}}>
            <Row className='justify-content-md-center'>
                <h1 style={{fontWeight:'bold'}}>{remarks[Math.floor(Math.random()*remarks.length)]}</h1>
            </Row>
            <Row className='justify-content-md-center'>
                <Spinner animation="border" variant="primary" />
            </Row>
        </Container>
    );
}

export default Loading;
