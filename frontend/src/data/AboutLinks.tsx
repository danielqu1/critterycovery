// get all image logos
import Postman from "../images/tools/PostmanLogo.png"
import Gitlab from "../images/tools/GitLabLogo.png"

type Tool = {
	name: string;
	text: string;
	img: string;
	link: string;
}

 // list of currently used tools
 function AboutLinks() {
	let aboutlinks: Tool[] = [
		{
			name: "Our Code",
			text: "View on GitLab",
			img: Gitlab,
			link: "https://gitlab.com/cs373-group16/critterycovery"
		},
		{
			name: "Our Api",
			text: "Doc on Postman",
			img: Postman,
			link: "https://documenter.getpostman.com/view/14742162/TzJrCzVs"
		}
	];

	return (
		aboutlinks
	); 
}

export default AboutLinks;