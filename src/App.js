import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { WarningAlert } from './Alert';


class App extends Component {

  state = {
    events: [],
    locations: [],
    locationSelected: 'all',
    numberOfEvents: 32
  }

  // to make the API call and save the initial data to state
  componentDidMount() {
    getEvents().then((events) => {
      this.setState({ events, locations: extractLocations(events) });
    });
  }
  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ? 
      events: events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents 
      });
    });
  }

  render() {
    const { locations, numberOfEvents } = this.state;
    return (
      <div className='App'>
        <h1 className = 'appTitle'>Meet <span className='appTitleSpan'>App</span></h1>
        <h4>Choose your nearest city</h4>
        {/* Displays the Components */}
        <CitySearch 
                    locations={locations} 
                    updateEvents={this.updateEvents} />
        <NumberOfEvents 
                    updateEvents={this.updateEvents}
                    numberOfEvents={numberOfEvents}/>
                    
                <div className='warningAlert'>
                    <WarningAlert text={this.state.offlineInfo} />
                </div>
        <EventList  events={this.state.events} /> 
      </div>
    );
  }
}

export default App;
