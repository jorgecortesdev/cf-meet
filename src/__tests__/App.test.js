import React from "react";
import { shallow, mount } from "enzyme";

import App from "../App";
import EventList from "../EventList";
import Event from "../Event";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";
import { extractLocations, getEvents } from "../api";

import { mockData } from "../mock-data";

describe("<App /> component", () => {
  let AppWrapper;

  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  it("renders a list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  it("renders CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  it("renders number of events input", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe("<App /> integration", () => {
  it('passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  it('passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  it("gets a list of events matching the city selected by the user", async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  it('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    CitySearchWrapper.setState({ showSuggestions: true });
    const suggestionItem = CitySearchWrapper.find(".suggestions li");
    await suggestionItem.simulate("click");
    const allEvents = await getEvents();
    expect(AppWrapper.state("events")).toEqual(allEvents);
    AppWrapper.unmount();
  });

  it('passes the "number of events" as prop to NumberOfEvents"', () => {
    const AppWrapper = mount(<App />);
    const AppNumberOfEventsState = AppWrapper.state("numberOfEvents");
    expect(AppNumberOfEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(AppNumberOfEventsState);
    AppWrapper.unmount();
  });

  it('changes the number of events on App when the number changes in NumberOfEvents', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const eventObject = { target: { value: 1 } };
    await NumberOfEventsWrapper.find(".numberOfEvents__input").simulate("change", eventObject);
    expect(AppWrapper.state("numberOfEvents")).toEqual(1);
    AppWrapper.unmount();
  });

  it("renders the number of events from numberOfEvents in state", async () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({ numberOfEvents: 1 });
    await AppWrapper.instance().updateEvents('all');
    expect(AppWrapper.state("events")).toHaveLength(1);
    AppWrapper.unmount();
  });
});
