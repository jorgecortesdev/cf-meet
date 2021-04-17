import React, { Component } from "react";

class Event extends Component {
  state = {
    showDetails: false,
  };

  toggleDetails = () => {
    this.setState({
      showDetails: !this.state.showDetails,
    });
  };

  render() {
    const { event } = this.props;
    const { showDetails } = this.state;

    return (
      <div className="event">
        <h1 className="event--summary">{event.summary}</h1>
        <div className="event--start">{event.start.dateTime}</div>
        <div className="event--location">{`@${event.summary} | ${event.location}`}</div>
        <button
          type="button"
          className="event--show-details"
          onClick={this.toggleDetails}
        >
          Show details
        </button>
        <div className={`event--details ${showDetails ? "show" : ""}`}>
          <h3>About event</h3>
          <p>
            <a href={event.htmlLink} target="_blank" rel="noreferrer">
              See details on Google Calendar
            </a>
          </p>
          <p>{event.description}</p>
        </div>
      </div>
    );
  }
}

export default Event;
