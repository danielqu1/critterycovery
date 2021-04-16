import { Container, Row, Col } from 'react-bootstrap';
import { useTableSearch } from '../../hooks/useTableSearch';
import { useHistory} from 'react-router-dom';
import ModelADCard from '../Cards/ModelADCard';
import SpeciesCard from '../Cards/SpeciesCard';
import HabitatCard from '../Cards/HabitatCard';
import CountryCard from '../Cards/CountryCard';

import { Input } from 'antd'
import 'antd/dist/antd.css'

const { Search } = Input

function SubSearch(props){
	const maxCardsShown = 9;
    let history = useHistory();
    const { filteredData, loading }  = useTableSearch({
		searchVal: props.searchVal,
		data: props.data,
	});

    const speciesCards = [];
    for (let i = 0; i < Math.min(maxCardsShown, filteredData.length); i++) {
        speciesCards.push(<Col className='container-fluid mt-4'>
            <a style={{ cursor: 'pointer' }} onClick={() => history.push("/species/"+filteredData[i].scientific_name+"?q="+props.searchVal)}>
            <SpeciesCard
                animal={filteredData[i]} 
                photo={filteredData[i].image_link}
                searchVal={props.searchVal}
            ></SpeciesCard></a></Col>);
    }
    if(filteredData.length > 9){
        speciesCards.push(<Col className='container-fluid mt-4'>
            <a className='unformat' style={{ cursor: 'pointer' }} href={"/species/?q="+props.searchVal}>
            <ModelADCard 
                model = {'Species'} 
                number = {filteredData.length - maxCardsShown}
            ></ModelADCard></a></Col>);
    }

    return (
            <Row xs={1} sm={2} md={3} lg={4} xl={5}>
                {speciesCards}
            </Row>
    );
}

export default SubSearch;