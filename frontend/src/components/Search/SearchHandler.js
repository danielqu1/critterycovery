import React, {useEffect, useState} from 'react';
import { Container, Row } from 'react-bootstrap';
import CountrySearch from './CountrySearch'
import SpeciesSearch from './SpeciesSearch'
import HabitatSearch from './HabitatSearch'

import { Input } from 'antd'
import 'antd/dist/antd.css'
import Loading from '../../pages/Loading';

const { Search } = Input

function SearchHandler(props){
    const [searchVal, setSearchVal] = useState(props.query?props.query:'')

    return (
        <Container>
            <Row>
                <Search
                    onChange={(e) => setSearchVal(e.target.value)}
                    defaultValue={props.query?props.query:''}
                    placeholder="Search"
                    style={{
                        width: '50%'
                    }}
                />
            </Row>
            <Row>Species</Row>
            <SpeciesSearch data={props.species} searchVal={searchVal}/>
            <Row>Habitats</Row>
            <HabitatSearch data={props.habitats} searchVal={searchVal}/>
            <Row>Countries</Row>
            <CountrySearch data={props.countries} searchVal={searchVal}/>
            

        </Container>
    
    );
}

export default SearchHandler;