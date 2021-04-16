import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

import SearchHandler from '../components/Search/SearchHandler'
import Loading from './Loading';
import axios from 'axios'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Search(){
    const [isLoading, setLoading] = React.useState(true);
    
    const [species, setSpecies] = useState([]);
    const [habitats, setHabitats] = useState([]);
    const [countries, setCountries] = useState([]);

    let query = useQuery().get('q')

    useEffect(() => {
        axios.get("/api/species").then((response) => {
            setSpecies(response.data.species);   
        })
        axios.get("/api/habitats").then((response) => {
            setHabitats(response.data.habitats);   
        })
        axios.get("/api/countries").then((response) => {
            setCountries(response.data.countries);   
        })
        setLoading(false);
    }, []);

    if (isLoading) {
        return Loading();
    }

    return (
            <SearchHandler
                species={species}
                habitats={habitats}
                countries={countries}
                query={query}/>
        );
    }

export default Search;