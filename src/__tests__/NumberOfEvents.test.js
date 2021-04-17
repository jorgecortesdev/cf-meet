import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  it("renders a text input", () => {
    const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    expect(NumberOfEventsWrapper.find(".number")).toHaveLength(1);
  });

  it("renders a text input correctly", () => {
    const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    const number = NumberOfEventsWrapper.state("number");
    expect(NumberOfEventsWrapper.find(".number").prop("value")).toBe(number);
  });

  it("defaults to 32 if user hasn't specified a number", () => {
    const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    expect(NumberOfEventsWrapper.state("number")).toBe(32);
  });

  it("changes the number if the text input change value", () => {
    const NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    const eventObject = { target: { value: 10 } };
    NumberOfEventsWrapper.find(".number").simulate("change", eventObject);
    expect(NumberOfEventsWrapper.state("number")).toBe(10);
  });
});
