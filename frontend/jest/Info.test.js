import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import "@testing-library/jest-dom/extend-expect"

import App from "../src/App.tsx";
import About from "../src/pages/About.tsx";

// used https://github.com/facebook/jest/issues/2663 to ultimately resolve Syntax error complaints. having a jest.config.js file overwrites these settings, so  don't have jest.config.js file

import Home from "../src/pages/Home.tsx"
import Error from "../src/pages/Error.tsx";
import CountryModal from "../src/components/Modal/CountryModal.tsx";
import HabitatModal from "../src/components/Modal/HabitatModal.tsx";
import SpeciesModal from "../src/components/Modal/SpeciesModal.tsx";

configure({ adapter: new Adapter() });

describe("Pages", () => {
    test("Home page", () => {
        const homeTest = shallow(<Home />)
        expect(homeTest).toMatchSnapshot()
    });

    test("Error page", () => {
        const aboutTest = shallow(<Error />)
        expect(aboutTest).toMatchSnapshot()
    });
});

describe("Modals", () => {
    
    test("Country Modal page", () => {
        const aboutTest = shallow(<CountryModal />)
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
});
