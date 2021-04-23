import { Row, Col } from 'react-bootstrap';
import { useTableSearch } from '../../hooks/useTableSearch';
import { useHistory} from 'react-router-dom';
import ModelADCard from '../Cards/ModelADCard';
import SpeciesCard from '../Cards/SpeciesCard';

function SubSearch(props){
	const maxCardsShown = 9;
    let history = useHistory();
    const { filteredData, }  = useTableSearch({
		searchVal: props.searchVal,
		data: props.data,
	});

    const speciesCards = [];
    for (let i = 0; i < Math.min(maxCardsShown, filteredData.length); i++) {
        speciesCards.push(<Col className='container-fluid mt-4'>
            <SpeciesCard
                data={filteredData[i]} 
                searchVal={props.searchVal}
                onClick={() => history.push("/species/"+filteredData[i].name+"?q="+props.searchVal)}
            /></Col>);
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