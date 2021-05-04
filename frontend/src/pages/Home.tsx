import ReactPlayer from 'react-player';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import ModelDeck from '../components/CardDecks/ModelDeck'
import homeImage from '../images/home.png'

/* Homepage for the website
 * Loads a video if autoplay is working for the browser
 * otherwise, it loads a lovely background
 * on top of the video, the title and 3 cards are displayed from ModelDeck
 */
const Home = () => { 
	const [videoVisibility, setVideoVisible] = useState('hidden' as 'hidden' | 'visible')

	// makes the video visible when auto-start starts it
	function video_start(){
		setVideoVisible('visible')
	}

	return (
		// Somehow this semi-works to remove the scrollbar
		<div style={{overflow:'hidden', height:'100%', maxHeight:'93.5vh'}}>
			<Container style={{ padding: 0, position: 'relative', alignContent: 'left', maxWidth: '100%', maxHeight: '10%', overflow:'hidden', height:'100%', backgroundImage: `url(${homeImage})`, backgroundSize: 'cover'}}>
				<Container fluid style={{ padding: 0 }}>
					{/* video container and a div that covers it so that the user cannot click the video */}
					<div className='home-video' style={{ width: '100vw', height: 'calc(100vw * .5625)', zIndex: 9}}></div>
					<div className='player-wrapper'>
						<ReactPlayer
							// only becomes visible on start
							style={{ overflowX: 'hidden', overflowY: 'hidden', visibility: videoVisibility  }}
							className='react-player'
							// video starts at a random time
							url={'https://www.youtu.be/8rPB4A3zDnQ?t=' + Math.floor(Math.random() * 1180)}
							playing={true}
							controls={false}
							onStart={video_start}
							config={{
								youtube: {
									playerVars: {
										autoplay: 1, showinfo: 0, disablekb: 1,
										fs: 0, iv_load_policy: 3, loop: 1,
										modestbranding: 1, rel: 0, pip: 0,
										end: 1180
									}
								}
							}}
							muted={true}
							loop={true}
							width='100vw'
							height='calc(100vw * .5625)'
						/>
					</div>
					{/* Div for the title setup to scale ok for moblie */}
					<Container className='home-title' style={{width:'100%', maxWidth:'600px', zIndex: 10 }}>
						<Row>
							<Col style={{padding: '0 1.5%', height:'auto'}}>
								<Container style={{ background: 'rgba(255, 255, 255, 0.7)', borderRadius: '.7vw' }}>
									<p className='font-big' style={{padding:0, marginBottom:0}}> critterycovery</p><br/>
									<p className='font-medium-big' style={{padding:0, marginTop:0, marginBottom:'3.33%'}}>raising awareness for endangered animals</p>
								</Container>
							</Col>
						</Row>
						<Row xs={3}>
							{<ModelDeck></ModelDeck>}
						</Row>
					</Container>
				</Container>
				<Container style={{overflow:'hidden', paddingTop:'100%'}}/>
			</Container>
		</div>
	); 
}; 
  
export default Home;
