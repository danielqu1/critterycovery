import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import "@testing-library/jest-dom/extend-expect"

//import About from "../src/pages/about/About.tsx";     // Jest complains about interface in About.tsx
import Error from "../src/pages/Error.tsx";
import CountryModal from "../src/components/Modal/CountryModal.tsx";
import HabitatModal from "../src/components/Modal/HabitatModal.tsx";
import SpeciesModal from "../src/components/Modal/SpeciesModal.tsx";



configure({ adapter: new Adapter() });

describe("Render views", () => {
    test("Error page", () => {
        const aboutTest = shallow(<Error />)
        expect(aboutTest).toMatchSnapshot()
    });

    test("Country Modal page", () => {
        const aboutTest = shallow(<CountryModal/>)
        expect(aboutTest).toMatchSnapshot()
    });

    test("Habitat Modal page", () => {
        const aboutTest = shallow(<HabitatModal />)
        expect(aboutTest).toMatchSnapshot()
    });

    test("Species Modal page", () => {
        const aboutTest = shallow(<SpeciesModal />)
        expect(aboutTest).toMatchSnapshot()
    });
})
