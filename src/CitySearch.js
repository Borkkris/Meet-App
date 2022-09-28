import React, { Component } from 'react';

class CitySearch extends Component {
  state = {

    query: '',
    suggestions: []
  }
// 
handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
        return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    this.setState({
        query: value,
        suggestions,
    });
};

//click event handle
handleItemClicked = (suggestion) => {
    this.setState({
        query: suggestion
    });
}

  render() {
    return (
      <div className="CitySearch">
        <input
        type='text'
        className='city'
        value={this.state.query} // <input> will derive its value from the value of query 
        onChange={this.handleInputChanged} //  This will detect whether any textual changes have been made on the inpu
        />
        <ul className="suggestions">
            {this.state.suggestions.map((suggestion) => (
                <li key={suggestion}
                    onClick={() => this.handleItemClicked(suggestion)}>
                        {suggestion}</li>
            ))}
            <li key='all'>
                <b>See all cities</b>
            </li>
            </ul>
      </div>
    );
  }
}

export default CitySearch;