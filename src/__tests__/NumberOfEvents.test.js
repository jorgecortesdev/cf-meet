import React from "react";
import { shallow, mount } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  it("renders a text input", () => {
    const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    expect(NumberOfEventsWrapper.find(".numberOfEvents")).toHaveLength(1);
  });

  it("renders a text input correctly", () => {
    const NumberOfEventsWrapper = mount(<NumberOfEvents numberOfEvents="10" updateNumberOfEvents={() => {}} />);
    const number = NumberOfEventsWrapper.props().numberOfEvents;
    expect(NumberOfEventsWrapper.find(".numberOfEvents__input").props().value).toBe(number);
  });
});
