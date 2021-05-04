// Attributes for Countries
import country from '../../../interfaces/country'
interface properties{
	text: string;
	highlightData: string | null;
}

function cardProperties(data:country){
	const cardProperties:Array<properties> = [
		{
			text: 'Population: ',
			highlightData: data.total_pop.toLocaleString(undefined),
		},
		{
			text: 'Capital: ',
			highlightData: data.capital,
		},
		{
			text: 'Region: ',
			highlightData: data.region,
		},
		{
			text: 'Land Area (km^2): ',
			highlightData: data.area ? data.area.toLocaleString(undefined) : '',
		}
	]
	return cardProperties
}

export default cardProperties;