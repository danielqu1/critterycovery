import ReactPlayer from 'react-player';
import { Container, Row, Col } from 'react-bootstrap'
import { Typography, Divider } from 'antd';
import ModelDeck from '../components/CardDecks/ModelDeck'

const { Title, Paragraph, Text, Link } = Typography;

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
		</Container>
	); 
}; 
  
export default Home;
