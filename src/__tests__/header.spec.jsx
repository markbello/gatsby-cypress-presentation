import React from "react"
import { shallow } from 'enzyme';
import renderer from "react-test-renderer"
import Header from "../components/header"

describe("Header", () => {
	it("renders correctly", () => {
		const component = shallow(<Header />);
		expect(component.debug()).toEqual('something');
	})
})