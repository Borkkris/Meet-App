import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
  state = {
    locations: this.props.locations,
    query: '',
    suggestions: [],
    showSuggestions: false
  }
// change handle
handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({showSuggestions:true});
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      return this.setState({
        query: value,
        infoText: `The City you were looking for doesn't exist. Please look for another City`,
      });
    } else {
      return this.setState({
        query: value,
        suggestions,
        infoText:''
      });
    }
  };


// click event handle
handleItemClicked = (suggestion) => {
  this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions:false,
      infoText:''
    });
  this.props.updateEvents(suggestion);
}

  render() {
    return (
      <div className='CitySearch'>
        <InfoAlert test={this.state.infoText} />
        <input  type='text'
                className='city'
                placeholder='search your City'
                value={this.state.query} // <input> will derive its value from the value of query 
                onChange={this.handleInputChanged} //  This will detect whether any textual changes have been made on the input
                onFocus={() => { this.setState({ showSuggestions:true }) }}
        />
        <ul className="suggestions" style={this.state.showSuggestions ? {}: { display: 'none' }}>

            {this.state.suggestions.map((suggestion) => (
                <li key={suggestion}
                    onClick={() => this.handleItemClicked(suggestion)}
                    >
                        {suggestion}</li>
            ))}
            <li onClick={() => this.handleItemClicked('all')}>
                <b>See all cities</b>
            </li>
            </ul>
      </div>
    );
  }
}

export default CitySearch;