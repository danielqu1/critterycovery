import React, { useState } from 'react';

import PersonDeck from '../components/CardDecks/PersonDeck'
import ToolDeck from '../components/CardDecks/ToolDeck'

import Tools from '../data/Tools'
import Apis from '../data/Apis'
import AboutLinks from '../data/AboutLinks'

import { Container, Row, Col } from 'react-bootstrap';

function About() { 

	const description: string = "This site is meant to educate people about different endangered species and address the problem" +
	" of reducing populations. Unless we do something about this issue, we won't be able to save these species until its too late." +
	" This would be a great shame because of the diversity that these animals bring to earth.";

	const compilation: string = "The compilation of our data allows us to focus on species that are critically endangered" +
	" and identify their country, ecosystem, and other characteristics so that we can help reduct this endangerment. The data" +
	" used here can come of real help to different organizations that aim to protect animals."; 

	return (
		<body>
			<Container fluid style={{ width: '70%' }}>
				<Row>
          <Container style={{textAlign:'center', paddingTop: '2%', marginTop: '3%', borderTop: '.25rem dotted lightgrey', borderBottom: '.25rem dotted lightgrey'}}>
            <h1 style={{fontWeight:'bolder'}}>About Us</h1>
            <p style={{fontSize: '18pt'}}>{ description }</p>
          </Container>
					
        </Row>
				<Row xs={1} sm={2} md={2} lg={3}>
					{<PersonDeck />}
				</Row>
        <Row >
          <Container style={{textAlign:'center', paddingTop: '2%', marginTop: '3%', borderTop: '.25rem dotted lightgrey'}}>
            <h1 style={{fontWeight:'bolder'}}>Tools</h1>
          </Container>
        
        </Row>
        <Row xs={1} sm={1} md={2} lg={3} xl={4}>
            {<ToolDeck tools={Tools()} />}
        </Row>
        <Row>
          <Container style={{textAlign:'center', paddingTop: '2%', marginTop: '3%', borderTop: '.25rem dotted lightgrey', borderBottom: '.25rem dotted lightgrey'}}>
            <h1 style={{fontWeight:'bolder'}}>Data</h1>
            <p style={{fontSize: '18pt'}}>{ compilation }</p>
          </Container>
				</Row>
        <Row >
          <Container style={{textAlign:'center', paddingTop: '2%'}}>
            <h1 style={{fontWeight:'bolder'}}>API's</h1>
          </Container>
        </Row>
        <Row xs={1} sm={1} md={2} lg={3} xl={4}>
            {<ToolDeck tools={Apis()} />}
        </Row>
        <Row >
          <Container style={{textAlign:'center', paddingTop: '2%', marginTop: '3%', borderTop: '.25rem dotted lightgrey'}}>
            <h1 style={{fontWeight:'bolder'}}>Links</h1>
          </Container>
        </Row>
        <Row className="justify-content-md-center" style={{paddingBottom: '2%', marginBottom: '3%', borderBottom: '.25rem dotted lightgrey'}} xs={2}>
          <Container >
            <Row className="justify-content-md-center" xs={2} md={2}>
              {<ToolDeck tools={AboutLinks()} />}
            </Row>
          </Container>
        </Row>
      </Container>
    </body>
  ); 
}; 
  
export default About;
