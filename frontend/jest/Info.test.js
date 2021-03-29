import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import "@testing-library/jest-dom/extend-expect"

//import About from "../src/pages/about/About.tsx";     // Jest complains about interface in About.tsx
import About from "../src/pages/Error.tsx";

configure({ adapter: new Adapter() });

describe("Render views", () => {
    test("Error page", () => {
        const aboutTest = shallow(<Error />)
        expect(aboutTest).toMatchSnapshot()
    })
})
