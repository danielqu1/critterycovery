import React, { useState } from 'react';
import PersonDeck from '../components/CardDecks/PersonDeck'
import ToolDeck from '../components/CardDecks/ToolDeck'

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
			<Container fluid style={{ width: '90%' }}>
				<Row>
					<h1 className='font-medium-big'>General Description:</h1>
					<p>{ description }</p>
        </Row>
        <Row>
					<h1>Data:</h1>
					<p>{ compilation }</p>
				</Row>
				<Row xs={1} sm={2} md={2} lg={3}>
					{<PersonDeck />}
				</Row>
        <Row>
          <h1 style={{textAlign:'center'}}>Tools</h1>
        </Row>
        <Row xs={1} sm={1} md={2} lg={3} xl={4}>
            {<ToolDeck />}
        </Row>
        <Row>
          <h2>View our code base here: </h2><br />
          <a href="https://gitlab.com/cs373-group16/critterycovery">Gitlab</a><br />
          <h2>View our Postman API Documentation here: </h2><br />
          <a href="https://documenter.getpostman.com/view/14742162/TzCL8TrF">API Documentation</a><br />
        </Row>
        <Row>
          <h2>APIs used:</h2>
          <a href="https://api.protectedplanet.net/">https://api.protectedplanet.net/</a> Information about national and state parks<br />
          <a href="https://apiv3.iucnredlist.org/">https://apiv3.iucnredlist.org/</a> Information about specific endangered species<br />
          <a href="https://restcountries.eu">https://restcountries.eu/</a> Information about countries<br />
        </Row>

      </Container>
    </body>
  ); 
}; 
  
export default About;
