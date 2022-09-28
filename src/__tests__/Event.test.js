import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let event, EventWrapper;

    beforeAll(() => {
        event = mockData[0] // fetching data from mockData -> declared as event
        EventWrapper = shallow (<Event event={event} />);
    });

    test('render event collapsed by default', () => {
        expect(EventWrapper.state('show')).toBe(false);
    });
    
    test('render element event-title in event item', () => {
        expect(EventWrapper.find('.event-title')).toHaveLength(1);
    });

    test('render element event-title correctly', () => {
        expect(EventWrapper.find('.event-title').text()).toBe(event.title);
    });

    test('render element event-info in event item', () => {
        expect(EventWrapper.find('.event-info')).toHaveLength(1);
    })

    test('render element event-info correctly', () => {
        expect(EventWrapper.find('.event-info').text()).toContain(event.start.dateTime);
        expect(EventWrapper.find('.event-info').text()).toContain(event.start.timeZone)
        expect(EventWrapper.find('.event-info').text()).toContain(event.location)
    });

    test('render element showDetails-Button in event item', () => {
        expect(EventWrapper.find('.event-showDetails-btn')).toHaveLength(1);
    });

    test('render element hideDetails-Button in event item', () => {
        EventWrapper.setState({ show: true});
        expect(EventWrapper.find('.event-hideDetails-btn')).toHaveLength(1);
    });

    test('clicking on element showDetails-Button should expand the event-item to show event-details', () => {
        EventWrapper.setState({ show: false});
        EventWrapper.find('.event-showDetails-btn').simulate('click');
        expect(EventWrapper.state('show')).toBe(true);
    });

    test('clicking on element hideDetails-Button should collapse the event-item to hide event-details', () => {
        EventWrapper.setState({ show: true});
        EventWrapper.find('.event-hideDetails-btn').simulate('click');
        expect(EventWrapper.state('show')).toBe(false);
    });

});