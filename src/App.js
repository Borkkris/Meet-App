import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';

class App extends Component {

  state = {
    events: [],
    locations: []
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
      <div className="App">
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        {/* Displays the Components */}
        <CitySearch locations={locations}
                    updateEvents={this.updateEvents} // pass the updateEvents method as a prop to CitySearch so that you can call it inside handleItemClicked
        />
        <EventList  events={this.state.events} /> 
        <NumberOfEvents updateEvents={this.updateEvents}
                        numberOfEvents={numberOfEvents}
        />
      </div>
    );
  }
}

export default App;
