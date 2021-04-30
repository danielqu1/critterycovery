import { Image, Container } from 'react-bootstrap'

function HomeCard(props: any) {
	return(
		<Container className='hoverable' style={{borderRadius: '8%', padding:0, width: '90%', height: 'auto'}}>
			<a href={props.models.href}>
				<Image style={{width: '80%', height: '80%'}} src={props.models.image}></Image>
			</a>
		</Container>
	);
}

export default HomeCard;