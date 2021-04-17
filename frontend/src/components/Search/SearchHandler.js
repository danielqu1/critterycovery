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
            <Row className='justify-content-md-center'>
                <Search
                    onChange={(e) => setSearchVal(e.target.value)}
                    defaultValue={props.query?props.query:''}
                    placeholder="Search"
                    style={{
                        width: '50%',
                        height: '100%',
                        padding: '1% 0',
                    }}
                />
            </Row>
            <Row>
                <Container style={{textAlign:'center', padding: '1% 0', marginTop: '3%'}}>
                    <h1 style={{fontWeight:'bold'}}>Species</h1>
                </Container>
            </Row>
            <SpeciesSearch data={props.species} searchVal={searchVal}/>
            <Row>
                <Container style={{textAlign:'center', padding: '1% 0', marginTop: '3%', borderTop: '.25rem dotted grey'}}>
                    <h1 style={{fontWeight:'bold'}}>Habitats</h1>
                </Container>
            </Row>
            <HabitatSearch data={props.habitats} searchVal={searchVal}/>
            <Row>
                <Container style={{textAlign:'center', padding: '1% 0', marginTop: '3%', borderTop: '.25rem dotted grey'}}>
                    <h1 style={{fontWeight:'bold'}}>Countries</h1>
                </Container>
            </Row>
            <CountrySearch data={props.countries} searchVal={searchVal}/>
            

        </Container>
    
    );
}

export default SearchHandler;