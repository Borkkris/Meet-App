import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { WarningAlert } from './Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomeScreen from './WelcomeScreen';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';


class App extends Component {

  state = {
    events: [],
    locations: [],
    showWelcomeScreen: undefined, // This state will be used as a flag to determine when to render the welcome screen as follows: true will mean “show the welcome screen,” false will mean “hide it to show the other components,” and undefined will be used to render an empty div until the state gets either true or false:
    locationSelected: 'all',
    numberOfEvents: 32
  }

  // to make the API call and save the initial data to state
  async componentDidMount() {
    console.log("Component did mount")
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
      
  this.mounted = true;
  // trying to get the token from localStorage
  const accessToken = localStorage.getItem('access_token');
  // trying to verify it using another function "checkToken()"
  // If there’s an error in the object returned by checkToken(), the variable isTokenValid will be assigned with the value false; otherwise, it will be true
  const isTokenValid = (await checkToken(accessToken)).error ? false : true;
  const searchParams = new URLSearchParams(window.location.search);
  console.log("isToken", isTokenValid)
  console.log("searchParams", searchParams)
  // the application will be re-launched, only with the code parameter in the URL search field after your site’s domain
  const code = searchParams.get("code");
  this.setState({ showWelcomeScreen: !(code || isTokenValid) });
  console.log("showWelcomeScreen", this.state.showWelcomeScreen)
  if ((code || isTokenValid) && this.mounted) {

    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    }); 
  }
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift() // shift: to get the first element in the array, which is the name of the city
      return {city, number};
    })
    return data;
  };

  updateEvents = (location, eventCount) => {
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
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    const { locations, numberOfEvents, events } = this.state;
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
        
        <div className="data-vis-wrapper">
          <EventGenre events={events} />
          {/* ScatteredChart */}
          <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#ffa500" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <EventList events={this.state.events} />

        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
        getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
