import React, { Component } from "react";

class Event extends Component {
    toggleEventDetails = () => {
        this.setState({ show: !this.state.show });
    };

    state = { show: false };
    render() {
        const { event } = this.props
        return ( 
            <>
                <div className="event">
                    <h1 className="event-title">{event.title}</h1>
                    <p  className="event-info">
                        {event.start.dateTime} 
                        {event.start.timeZone}
                        {event.location}
                    </p>
                    {/* // from here shown when its expanded */}
                    {this.state.show && (
                        <>
                            <h2 className ="event-about-title">About event:</h2>
                            <p  className = "event-description">{event.description}</p>
                            <a  className="event-htmlLink"
                                href={event.htmlLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            > 
                            See details on Goofgle Calendar
                            </a>
                            <p  className = "event-description">{event.description}</p>
                        </>
                    )}
                    {!this.state.show ? (
                        <button className="event-showDetails-btn"
                                onClick={this.toggleEventDetails}
                        >
                            Show details
                        </button>
                    ) : (
                        <button className="event-hideDetails-btn"
                                onClick={this.toggleEventDetails}
                        >
                            hide details
                        </button>
                    )}
                </div>
            </>
        );
    };
};

export default Event;