import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import About from "../src/pages/about/About.tsx";

configure({ adapter: new Adapter() });

describe("Render views", () => {
    test("About page", () => {
        const aboutTest = shallow(<About />)
        expect(aboutTest).toMatchSnapshot()
    })
})
