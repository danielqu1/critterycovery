import { Container, Row } from 'react-bootstrap'

function NoDATA() {
	return (
		<Container fluid style={{ padding: '15%' }}>
			<Row className='justify-content-md-center'>
				<h1 style={{fontWeight:'bold'}}>Error 500.</h1>
			</Row>
			<Row className='justify-content-md-center'>
				<h1 style={{fontWeight:'bold'}}>Our Database is Down</h1>
			</Row>
		</Container>
	);
}

export default NoDATA;