import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;

    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />)
    });

    test('render element number-input', () => {
        expect(NumberOfEventsWrapper.find('.number-input')).toHaveLength(1);
    });

    test('render default number in input should be 32', () => {
        expect(NumberOfEventsWrapper.find('.number-input').prop('value')).toBe(32);
    });

    test('change the number of events in input field by changing state', () => {
        NumberOfEventsWrapper.setState({ eventNumbers: 32 });
        const eventObject = { target: { value: 8 } };
        NumberOfEventsWrapper.find('.number-input').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('eventNumbers')).toBe(8);
    });
})