import { Container, Row } from 'react-bootstrap';
import ToolDeck from '../components/CardDecks/ToolDeck'

import SupportGroups from '../data/SupportGroups'

// Support page for the website to encourage civic responsibility
// displays information for how to get involved
function Support() {

	const description1 : string = "Many animals are on the verge of becoming extinct on Earth. " +
		"In the past decade alone, almost 500 species have gone extinct, and it is unlikely to slow down " +
		"anytime soon."

	const description2 : string = "Unfortunately, this is an issue that rarely receives attention, and most people " +
		"are apathetic to the condition of severely endangered animals. " +
		"We want this to change.The problem of endangered species is not something that can be resolved overnight; " +
		"instead, we have to bring awareness of the seriousness of this problem to public attention " +
		"so that collective action can be made to save these endangered species. "

	const description3 : string = "Please consider supprting these conservation groups to make the world a better place.";

	return (
		<Container>
			<Container fluid className='justify-content-md-center'>
				<Row>
					<Container style={{ textAlign: 'center', padding: '2% 0', marginTop: '3%', borderTop: '.25rem dotted grey', borderBottom: '.25rem dotted grey' }}>
						<h1 style={{ fontWeight: 'bolder' }}>Support</h1>
						<p style={{ fontSize: '15pt' }}>{description1}</p>
						<p style={{ fontSize: '15pt' }}>{description2}</p>
						<p style={{ fontSize: '15pt' }}>{description3}</p>
					</Container>
				</Row>

				<Row className="justify-content-md-center" style={{ paddingBottom: '2%', marginBottom: '3%', borderBottom: '.25rem dotted grey' }}>
					{<ToolDeck tools={SupportGroups()} />}
				</Row>


			</Container>
		</Container>
		
		
	);

}

export default Support;