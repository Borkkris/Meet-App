import React from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

function App() {
  return (
    <div className="App">
      {/* Displays the Components */}
      <CitySearch />
      <EventList /> 
      <NumberOfEvents />
    </div>
  );
}

export default App;
