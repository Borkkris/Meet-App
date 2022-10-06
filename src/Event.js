import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

class Event extends Component {
    toggleEventDetails = () => {
        this.setState({ show: !this.state.show });
    };

    state = { show: false };
    render() {
        const { event } = this.props
        return ( 
            <>
                <Card className='event' border='light'>
                    <Card.Body>
                        <Card.Header>
                            <h1 className='event-summary'>{event.summary}</h1>
                        </Card.Header>

                        <p  className='event-info'> 
                            {event.start.dateTime} 
                            {event.start.timeZone}
                            {event.location}
                        </p>
                        
                        {/* // from here shown when its expanded */}
                        {this.state.show && (
                            <>
                                <h2 className ='event-about-title'>About event:</h2>
                                <p  className = 'event-description'>{event.description}</p>
                                <Card.Link href={event.htmlLink}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                > 
                                See details on Google Calendar
                                </Card.Link>
                                <p  className = 'event-description'>{event.description}</p>
                            </>
                            )}
                            <Card.Footer>
                                {!this.state.show ? (
                                    <Button className='event-showDetails-btn'
                                            variant='outline-light'
                                            onClick={this.toggleEventDetails}
                                    >
                                        Show details
                                    </Button>
                                    ) : (
                                    <Button className='event-hideDetails-btn'
                                            variant='outline-light'
                                            onClick={this.toggleEventDetails}
                                    >
                                        hide details
                                    </Button>
                                )}
                            </Card.Footer>
                    </Card.Body>
                </Card>
            </>
        );
    };
};

export default Event;