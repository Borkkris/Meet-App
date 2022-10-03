import React, { Component } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

class Event extends Component {
    toggleEventDetails = () => {
        this.setState({ show: !this.state.show });
    };

    state = { show: false };
    render() {
        const { event } = this.props
        return ( 
            <>
                <Row>
                    <Col>
                    <Card border='light' className="m-2 h-100" >
                        <Card.Body>
                            <Card.Title><h1>{event.title}</h1></Card.Title>
                            
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
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </>
        );
    };
};

export default Event;