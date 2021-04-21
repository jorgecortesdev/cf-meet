import React, { Component } from "react";

export default class NumberOfEvents extends Component {

  handleInputChange = (event) => {
    this.props.updateNumberOfEvents(event.target.value);
  };

  render() {
    return (
      <div className="numberOfEvents">
        <label>Number of Events: </label>
        <input
          type="text"
          className="numberOfEvents__input"
          value={this.props.numberOfEvents}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}
