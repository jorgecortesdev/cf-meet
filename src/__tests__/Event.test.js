import React from "react";
import { shallow } from "enzyme";
import { mockData } from "../mock-data";
import Event from "../Event";

describe("<Event /> component", () => {
  let eventData;
  let EventWrapper;

  beforeAll(() => {
    eventData = mockData[0];
    EventWrapper = shallow(<Event event={eventData} />);
  });

  it("renders an event", () => {
    expect(EventWrapper.find(".event")).toHaveLength(1);
  });

  it("renders the event summary", () => {
    let eventSummary = EventWrapper.find(".event__Overview--name");
    expect(eventSummary).toHaveLength(1);
    expect(eventSummary.text()).toEqual(eventData.summary);
  });

  it("renders the event date", () => {
    let eventStart = EventWrapper.find(".event__Overview--localDate");
    expect(eventStart).toHaveLength(1);
    expect(eventStart.text()).toEqual(eventData.start.dateTime);
  });

  it("renders the event location", () => {
    let eventLocation = EventWrapper.find(".event__Overview--venue");
    expect(eventLocation).toHaveLength(1);
    expect(eventLocation.text()).toEqual(
      `@${eventData.summary} | ${eventData.location}`
    );
  });

  it("renders the details button", () => {
    let eventShowDetails = EventWrapper.find(".details-btn");
    expect(eventShowDetails).toHaveLength(1);
    expect(eventShowDetails.text()).toEqual("show details");
  });

  it("does not include the event details by default", () => {
    let eventDetails = EventWrapper.find(".event__Details");
    expect(eventDetails).toHaveLength(0);
  });

  it("renders event details when user clicks on details button", () => {
    EventWrapper.setState({ showDetails: false });
    const showDetails = EventWrapper.state("showDetails");
    EventWrapper.find(".details-btn").simulate("click");
    expect(EventWrapper.state("showDetails")).toEqual(!showDetails);
    expect(EventWrapper.find(".event__Details")).toHaveLength(1);
    expect(EventWrapper.find(".details-btn").text()).toBe("hide details");
  });

  it("hides event details if are rendered when user clicks on details button", () => {
    EventWrapper.setState({ showDetails: true });

    expect(EventWrapper.find(".event__Details")).toHaveLength(1);

    EventWrapper.find(".details-btn").simulate("click");

    expect(EventWrapper.find(".event__Details")).toHaveLength(0);
  });
});
