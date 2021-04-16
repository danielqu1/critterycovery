import React, {useEffect, useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTableSearch } from '../../hooks/useTableSearch';
import SpeciesCard from '../Cards/SpeciesCard';
import HabitatCard from '../Cards/HabitatCard';
import CountryCard from '../Cards/CountryCard';
import ModelADCard from '../Cards/ModelADCard';

import { Input } from 'antd'
import 'antd/dist/antd.css'

function SubSearch(props){
	const maxCardsShown = 9;
    const { filteredData, loading }  = useTableSearch({
		searchVal: props.searchVal,
		data: props.data,
	});

    const countryCards = [];
    for (let i = 0; i < Math.min(maxCardsShown, filteredData.length); i++) {
        countryCards.push(<Col className='container-fluid mt-4'>
            <a className='unformat' style={{ cursor: 'pointer' }} href={"/countries/"+filteredData[i].name+"?q="+props.searchVal}>
            <CountryCard 
                country={filteredData[i]} 
                searchVal={props.searchVal}
            ></CountryCard></a></Col>);
    }
    if(filteredData.length > 9){
        countryCards.push(<Col className='container-fluid mt-4'>
            <a className='unformat' style={{ cursor: 'pointer' }} href={"/countries/?q="+props.searchVal}>
            <ModelADCard 
                model = {'Species'} 
                number = {filteredData.length - maxCardsShown}
            ></ModelADCard></a></Col>);
    }
    return (
            <Row xs={1} sm={2} md={3} lg={4} xl={5}>
                {countryCards}
            </Row>
    );
}

export default SubSearch;