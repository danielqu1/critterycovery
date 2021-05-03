import React from 'react'
import BarChart from '../viz/vizgraphs/BarChart'
import providerIncidents from '../viz/vizdata/temp-atx-incidents.json'
// vizData = ../components/vizdata/
// code = ../components/vizgraphs/

function Visualizations() {
    return (
        <div>
            <br />
            <h1>Provider Data</h1>
            <hr />
            <h3>Incidents Per Austin District</h3>
            <BarChart
                data={providerIncidents} xAttr="name" yAttr="value"
                xLabel="Districts" yLabel="Incidents"
            />
            <hr />
        </div>
    )
}

export default Visualizations
