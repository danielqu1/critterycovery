// get all image logos
import NatureConservancy from "../images/support/nature_conservancy.jpg";
import WorldWildlife from "../images/support/world_wildlife.png";
import Oceana from "../images/support/oceana.png";
import IUCN from "../images/support/iucn.png";

type SupportGroup = {
	name: string;
	text: string;
	img: string;
	link: string;
}

// list of currently used tools
function SupportGroups() {
	let supportgroups: SupportGroup[] = [
		{
			name: "The Nature Conservancy",
			text: "",
			img: NatureConservancy,
			link: "https://www.nature.org/en-us/"
		},
		{
			name: "The World Wildlife Fund",
			text: "",
			img: WorldWildlife,
			link: "https://www.worldwildlife.org/"
		},
		{
			name: "Oceana",
			text: "",
			img: Oceana,
			link: "https://oceana.org/"
		},
		{
			name: "IUCN Red List",
			text: "",
			img: IUCN,
			link: "https://www.iucnredlist.org/"
		}
	];

	return (
		supportgroups
	);
}

export default SupportGroups;