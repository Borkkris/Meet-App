import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;

    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />)
    });

    test('render element number-input', () => {
        expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
    });

    test('display 32 by default', () => {
        expect(
            NumberOfEventsWrapper.find('.number-of-events').get(0).props.value
        ).toEqual(32);
    });

    test('user change number of events', () => {
        NumberOfEventsWrapper.find('.number-of-events').simulate(
            'change', {target: { value: 5 }}
        );
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(5);
    });

    test('change numberOfEvents state when number input changes', () => {
        NumberOfEventsWrapper.setState({ numberOfEvents: 10 });
        NumberOfEventsWrapper.find('.number-of-events').simulate('change', { target: { value: 4 } });
        expect(NumberOfEventsWrapper.state('numberOfEvents')).not.toEqual(undefined);
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toEqual(4);
    });
})