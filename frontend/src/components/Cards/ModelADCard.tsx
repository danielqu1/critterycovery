// Card shown on the search page displaying how many more search results 
// there are after displaying n search results
import { Card } from 'antd'

function ModelADCard(props: any) {
	return(
		<Card style={{width: '100%'}} >
			{props.model} has {props.number} more instances. Click here to view them.
		</Card>
	);
}

export default ModelADCard;