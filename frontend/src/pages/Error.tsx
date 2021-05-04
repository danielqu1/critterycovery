import { Container, Row } from 'react-bootstrap'

// Displays a simple page for whenever the router has no other path
// Basically just a generic 404 error page
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