import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import HabitatTable from '../components/Tables/HabitatTable';
import HabitatModal from '../components/Modal/HabitatModal';
import Loading from './Loading';
import axios from 'axios';
import { Input } from 'antd'
const { Search } = Input

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

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Habitats(props : any) {
    const {id} = useParams<{ id: string }>();
    const [habitats, setHabitats] = useState(new Array<habitat>());
    const [isLoading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [habitat, setHabitat] = useState(habitats[0])
    const [searchVal, setSearchVal] = useState("");
    let history = useHistory();
    let query = useQuery().get('q')

    useEffect(() => {
        return () => {
            if (history.action === "POP") {
                setModalShow(false);
            }
            else if (history.action === "PUSH") {
                setModalShow(true);
            }
        };
    }, [history.action])
    
    useEffect(() => {
            axios.get("/api/habitats").then((response) => {
                setHabitats(response.data.habitats);
                if(id != null){
                    axios.get("/api/habitats/name=" + id).then((response) => {
                        if(response.data != null){
                            setHabitat(response.data.habitat)
                            setModalShow(true)
                        } 
                    }).catch(err => {
                        //DO NOTHING
                    })
                }
                if (query){
                    setSearchVal(query)
                }
                setLoading(false);
            })
    }, [id, query]);
    
    
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
                    <Container style={{textAlign:'center', padding: '2% 0', marginTop: '3%', borderTop: '.25rem dotted grey', borderBottom: '.25rem dotted grey'}}>
                        <h1 style={{fontWeight:'bolder'}}>Habitats</h1>
                    </Container>
                </Row>
                <Row className='justify-content-md-center'>
                    <Search
                        onChange={(e) => setSearchVal(e.target.value)}
                        defaultValue={query?query:''}
                        placeholder="Search"
                        style={{
                            width: '50%',
                            height: '100%',
                            padding: '1% 0',
                        }}
                    />
                </Row>
                <Row>
                    <HabitatTable
                        habitats={habitats}
                        update={update}
                        searchVal={searchVal}/>
                </Row>
            </Container>
        </Container>
        
    );
}

export default Habitats;
