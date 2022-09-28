import React, { Component } from 'react';



class NumberOfEvents extends Component {
    handleInputChange = (event) => {
        this.props.updateEvents(undefined, event.target.value);
        const value = event.target.value;
        this.setState({ eventNumbers: value });
    };

    state = { eventNumbers: 32}
    render() {
        return (
            <div className = "numberOfEvents">
                <label> Number of Events
                    <input  className="number-input"
                            type="number"
                            value={this.state.eventNumbers}
                            onChange={this.handleInputChange}
                    />
                </label>
            </div>

        )
    }
}

export default NumberOfEvents;