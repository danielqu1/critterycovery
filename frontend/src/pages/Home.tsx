import ReactPlayer from 'react-player';
import { Container, Row, Col } from 'react-bootstrap'
import ModelDeck from '../components/CardDecks/ModelDeck'

const Home = () => { 

	return (
		<Container style={{ padding: 0, position: 'relative', alignContent: 'left', maxWidth: '100%', overflowX: 'hidden' }}>
			<Container fluid style={{ padding: 0 }}>
				<div className='home-video' style={{ width: '100vw', height: 'calc(100vw * .5625)', zIndex: 9 }}></div>
				<div className='player-wrapper'>
					<ReactPlayer
						style={{ overflowX: 'hidden', overflowY: 'hidden' }}
						className='react-player'
						url={'https://www.youtu.be/8rPB4A3zDnQ?t=' + Math.floor(Math.random() * 1200)}
						playing={true}
						controls={false}
						config={{
							youtube: {
								playerVars: {
									autoplay: 1, showinfo: 0, disablekb: 1,
									fs: 0, iv_load_policy: 3, loop: 1,
									modestbranding: 1, rel: 0, pip: 0,
									end: 1190
								}
							}
						}}
						muted={true}
						loop={true}
						width='100vw'
						height='calc(100vw * .5625)'
					/>
				</div>
				<Container className='home-title' style={{ width: '40%', zIndex: 10 }}>
					<Row>
						<Col>
							<Container style={{ background: 'rgba(255, 255, 255, 0.7)', borderRadius: '.7vw' }}>
								<p className='font-big'> critterycovery</p>
								<p className='font-medium-big'>raising awareness for endangered animals</p>
								<p></p>
							</Container>
						</Col>
					</Row>
					<Row xs={3}>
						{<ModelDeck></ModelDeck>}
					</Row>
				</Container>
			</Container>
		</Container>
	); 
}; 
  
export default Home;
