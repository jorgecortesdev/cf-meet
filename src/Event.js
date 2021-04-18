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
        <div className="event__Overview">
          <h2 className="event__Overview--name">{event.summary}</h2>
          <p className="event__Overview--localDate">{event.start.dateTime}</p>
          <p className="event__Overview--venue">{`@${event.summary} | ${event.location}`}</p>
          <button
            type="button"
            className="details-btn"
            onClick={this.toggleDetails}
          >
            {showDetails ? "hide details" : "show details"}
          </button>
          {showDetails && (
            <div className="event__Details">
              <h3>About event</h3>
              <h4>
                <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">
                  See details on Google Calendar
                </a>
              </h4>
              <p className="event__Details--description">{event.description}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Event;
