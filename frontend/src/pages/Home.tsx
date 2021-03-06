import React from 'react'; 
import ReactPlayer from 'react-player';
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import { relative } from 'node:path';

const Home = () => { 
  return (
  <body>
        <div className='home-video' style={{width:'100vw', height:'calc(100vw * .5625)', zIndex:10}}>.</div>
        <div className='player-wrapper home-video'>
          <ReactPlayer
            className='react-player'
            url={'https://www.youtu.be/8rPB4A3zDnQ?t='+ Math.floor(Math.random()*1200)}
            playing={true}
            controls={false}
            config={{
              youtube: {
                playerVars: { autoplay: 1, showinfo: 0, disablekb: 1, 
                              fs: 0, iv_load_policy: 3, loop: 1, 
                              modestbranding: 0, rel: 0, pip: 0, 
                              end: 1190}
              }
            }}
            muted={true}
            loop={true}
            width='100vw'
            height='calc(100vw * .5625)'
          />
          <div className='home-title'>
            <p className='font-big'> Critters need Recovery</p>
            <p className='font-medium-big'>If you love animals, you should support them</p>
          </div>
        <Container fluid='md' style={{alignContent:'center', top: '100vh'}}>
        <Row>
          <Col>
            <Button href='/species' variant="light" style={{padding:'none', margin:'none'}}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://i.imgur.com/dyN72lq.png" />
                <Card.Body>
                  <Card.Title>Species</Card.Title>
                  <Card.Text>
                    Click here to go to species
                  </Card.Text>
                </Card.Body>
              </Card></Button></Col>
          <Col>
          <Button href='/species' variant="light" style={{padding:'none', margin:'none'}}>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://i.imgur.com/bU8w49l.jpg" />
                <Card.Body>
                  <Card.Title>Habitats</Card.Title>
                  <Card.Text>
                    Click here to go to Habitats
                  </Card.Text>
                </Card.Body>
              </Card></Button></Col>

          <Col>
            <Button href='/species' variant="light" style={{border:'none',}}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src="https://i.imgur.com/o1e9atI.jpeg" />
                  <Card.Body>
                    <Card.Title>Countries</Card.Title>
                    <Card.Text>
                      Click here to go to countries
                    </Card.Text>
                  </Card.Body>
                </Card></Button></Col>
        </Row>
      </Container>
      </div>
  </body>
  ); 
}; 
  
export default Home;
