import { Card, Button, Image, Container} from 'react-bootstrap'

function ModelCard(props: any) {
    return(
        <Container className='hoverable' style={{borderRadius: '8%'}}>
            <a href={props.models.href}>
                <Image style={{width: '100%', height: '100%'}} src={props.models.image}></Image>
            </a>
        </Container>
    );
}

export default ModelCard;