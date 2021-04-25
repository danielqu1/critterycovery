import { Container, Row } from 'react-bootstrap'

function Error() {
	return (
		<Container fluid style={{ padding: '15%' }}>
			<Row className='justify-content-md-center'>
				<h1 style={{fontWeight:'bold'}}>Error 404.</h1>
			</Row>
			<Row className='justify-content-md-center'>
				<h1 style={{fontWeight:'bold'}}>Page Not Found</h1>
			</Row>
		</Container>
	);
}

export default Error;