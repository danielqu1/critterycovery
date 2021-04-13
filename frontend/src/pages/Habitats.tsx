import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import HabitatTable from '../components/Tables/HabitatTable';
import HabitatModal from '../components/Modal/HabitatModal';
import Loading from './Loading';
import axios from 'axios';

interface habitat {
    id: number;
    name: string;
    marine: boolean;
    reported_marine_area: number;
    reported_terrestrial_area: number;
    countries: string;
    iucn_category: number;
    designation_name: string;
    designation_id: number;
    link: string;
}

function Habitats(props : any) {
    const offset = 3;
    const {id} = useParams<{ id: string }>();
    const [habitats, setHabitats] = React.useState(new Array<habitat>());
    const [isLoading, setLoading] = React.useState(true);
    const [modalShow, setModalShow] = React.useState(false);
    const [habitat, setHabitat] = React.useState(habitats[0])
    let history = useHistory();

    React.useEffect(() => {
        return () => {
            if (history.action === "POP") {
                setModalShow(false);
            }
            else if (history.action === "PUSH") {
                setModalShow(true);
            }
        };
    }, [history.action])
    
    React.useEffect(() => {
            axios.get("/api/habitats").then((response) => {
                setHabitats(response.data.habitats);
                if(id != null){
                    axios.get("/api/habitats/name=" + id).then((response) => {
                        if(response.data != null){
                            setHabitat(response.data.habitat)
                            setModalShow(true)
                        } 
                    })
                }
                setLoading(false);    
        })}, []);
    
    
    if (isLoading) {
        return Loading();
    }

    function update(place : habitat) {
        history.push(`/habitats/${place.name}`)
        setHabitat(place)
        setModalShow(true)
    }

    function closeModal(){
        setModalShow(false);
        history.push('/habitats');
    }
    
    return(
        <Container>
            <HabitatModal
                habitat={habitat}
                show={modalShow}
                onHide={() => closeModal()}
            />

            <Container fluid className="justify-content-md-center">
                <Row>
                    <HabitatTable
                        habitats={habitats}
                        update={update}/>
                </Row>
            </Container>
        </Container>
        
    );
}

export default Habitats;
