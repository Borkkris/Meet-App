import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { WarningAlert } from './Alert';
import 'bootstrap/dist/css/bootstrap.min.css';


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

    // for the WarningAlert (Idk how to make it work, probably it needs access to the cache or so?)
    if (!navigator.onLine) {
      this.setState({
        warningText:
          "List of events has been loaded from your cache! Please check your Internet connection!",
        });
      } else {
        this.setState({
          warningText: '',
        });
      }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (eventCount === undefined) {
      eventCount = this.state.numberOfEvents;
    } else (
      this.setState({ numberOfEvents: eventCount })
      )
    if (location === undefined) {
      location = this.state.locationSelected;
    }
    getEvents().then((events) => {
       let locationEvents = (location === 'all') 
          ? events : events.filter((event) => event.location === location);
            this.setState({
                events: locationEvents.slice(0, eventCount),
                numberOfEvents: eventCount,
                locationSelected: location,
            });
        });
    }

  render() {
    const { locations, numberOfEvents } = this.state;
    return (
      <div className='App'>
        <h1 className = 'appTitle'>Meet App</h1>
        <h5>see upcoming events</h5>
        {/* Displays the Components */}
        <CitySearch 
                    locations={locations} 
                    updateEvents={this.updateEvents} />
        <NumberOfEvents 
                    updateEvents={this.updateEvents}
                    numberOfEvents={numberOfEvents}/>
                    
                <div className='warningAlert'>
                    <WarningAlert text={this.state.warningText} />
                </div>
        <EventList  events={this.state.events} /> 
      </div>
    );
  }
}

export default App;
