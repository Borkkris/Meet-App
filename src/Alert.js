import React, { Component } from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
        this.color = null;
    }

    getStyle = () => {
        return {
            color: this.color,
        };
    }

    render() {
        return (
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}
// Subclass InfoAlert / CitySearch
class InfoAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'blue';
    }
}
// Subclass WarningAlert / App
class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        console.log("Text", props.text)
        this.color = 'orange';
    }
}
// Subclass ErrorAlert / NumberOfEvent
class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'red';
    }
}

export{ InfoAlert, WarningAlert, ErrorAlert };