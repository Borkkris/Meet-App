import React from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';

function App() {
  return (
    <div className="App">
      {/* Displays the Components */}
      <CitySearch />
      <EventList /> 
    </div>
  );
}

export default App;
