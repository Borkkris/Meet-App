// basic structure to test React components

import React from 'react';
import { shallow } from 'enzyme';
import App from '../App'; // importing App so I can test withouth importing the test
import EventList from '../EventList'; // importing the EventList component
import CitySearch from '../CitySearch';

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
});