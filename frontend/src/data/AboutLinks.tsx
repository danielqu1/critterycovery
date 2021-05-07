// get all image logos
import Postman from "../images/tools/PostmanLogo.png"
import Gitlab from "../images/tools/GitLabLogo.png"
import Youtube from "../images/tools/youtubeLogo.png"

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
		},
		{
			name: "Our Presentation",
			text: "Watch on Youtube",
			img: Youtube,
			link: "https://youtu.be/4aju_i0ZhkM"
		},

	];

	return (
		aboutlinks
	); 
}

export default AboutLinks;