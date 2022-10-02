// basic structure to test React components

import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App'; // importing App so I can test withouth importing the test
import EventList from '../EventList'; // importing the EventList component
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

// unit tests scope
describe('<App /> component', () => {
    let AppWrapper;
    beforeAll (() => {
        AppWrapper = shallow(<App />)
    });

    test('render list of events', () => { // describes the test
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    test('render CitySearch', () => { // describes the test
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

// integration tests scope
describe('<App /> integration', () => {

    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />); // mount used to render the component deeply (i.e., together with its children)

        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined); // test checks whether the state of events isn’t undefined
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        AppWrapper.unmount(); // Tests that use the same DOM will affect each other, so you need to “clean up” your DOM after each test using a function called unmount().
    });

    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);

        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });

    test('get list of events matching the city selected by the user', async () => { // Always add async to a test’s callback function if it contains async code.

        const AppWrapper = mount(<App />);

        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * (suggestions.length)); // will evaluate to an integer value ranging from 0 to suggestion.length - 1
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity); // await before a statement returns a promise that the function will stop and wait for the result before continuing execution
        const allEvents = await getEvents(); // This API-function is mainly expected to get all the events from the API asynchronously
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow); // test compares whether the state of events actually takes the same array as the events that resulted from the filtering process in the previous step
        AppWrapper.unmount();
    });

    test('get list of all events when user selects "See all cities"', async () => {

        const AppWrapper = mount(<App />);

        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });

});