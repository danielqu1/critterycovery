import React from 'react'
import BarChart from '../viz/vizgraphs/BarChart'
import providerIncidents from '../viz/vizdata/temp-atx-incidents.json'
import providerRestaurants from '../viz/vizgraphs/TypesOfRestaurantsInAustin'
// vizData = ../components/vizdata/
// code = ../components/vizgraphs/

function Visualizations() {
    return (
        <div>
            <br />
            <h1>Provider Data</h1>
            <hr />
            <h3>Incidents Per Austin District</h3>
            <iframe width="70%" height="700" src="https://observablehq.com/embed/@sahithi-golkonda/incidents-per-austin-district-bar-chart?cells=viewof+order%2Cchart" />
            <hr />
            <h3>Types of Restaurants in Austin</h3>
            <iframe width="70%" height="700" src="https://observablehq.com/embed/@sahithi-golkonda/types-of-restaurants-in-austin?cells=chart" />
            <hr />
            <h3>Distance to City Center vs Price for Austin Hotels</h3>
            <iframe width="70%" height="700" src="https://observablehq.com/embed/@sahithi-golkonda/distance-to-city-center-vs-price-for-austin-hotels?cells=viewof+selection" />
            <hr />
            <h1>Our Data</h1>
            <hr />
            <h3>Incidents Per Austin District</h3>
            <iframe width="70%" height="700" src="https://observablehq.com/embed/@sahithi-golkonda/incidents-per-austin-district-bar-chart?cells=viewof+order%2Cchart" />
            <hr />
            <h3>Types of Restaurants in Austin</h3>
            <iframe width="70%" height="700" src="https://observablehq.com/embed/@sahithi-golkonda/types-of-restaurants-in-austin?cells=chart" />
            <hr />
            <h3>Distance to City Center vs Price for Austin Hotels</h3>
            <iframe width="70%" height="700" src="https://observablehq.com/embed/@sahithi-golkonda/distance-to-city-center-vs-price-for-austin-hotels?cells=viewof+selection" />
        </div>
    )
}

export default Visualizations
