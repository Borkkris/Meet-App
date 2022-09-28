// basic structure to test React components

import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList'; // importing the EventList component
import Event from '../Event';
import { mockData } from '../mock-data';


describe('<EventList /> component', () => {
    test('render correct number of events', () =>
    {
        const EventListWrapper = shallow(<EventList events = {mockData} />); // events from the Google Calendar API
        expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
    });
});