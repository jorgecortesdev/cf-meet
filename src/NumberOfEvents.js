import React, { Component } from "react";

export default class NumberOfEvents extends Component {
  state = {
    number: 32,
  };

  handleInputChange = (event) => {
    this.setState({
      number: event.target.value,
    });
  };

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          type="text"
          className="number"
          value={this.state.number}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}
