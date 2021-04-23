import { Image, Container } from 'react-bootstrap'

function ModelCard(props: any) {
    return(
        <Container className='hoverable' style={{borderRadius: '8%', padding:0}}>
            <a href={props.models.href}>
                <Image style={{width: '50%', height: '50%'}} src={props.models.image}></Image>
            </a>
        </Container>
    );
}

export default ModelCard;