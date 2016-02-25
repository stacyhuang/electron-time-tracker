var React = require("react");

var TotalTime = React.createClass({
  propTypes: {
    totalTime: React.PropTypes.number.isRequired
  },
  convertTime: function(timeInSec) {
    var timeInSec = parseInt(this.props.totalTime, 10);
    var hours = Math.floor(timeInSec / 3600);
    var minutes = Math.floor((timeInSec - (hours * 3600)) / 60);
    var seconds = timeInSec - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours };
    if (minutes < 10) { minutes = "0" + minutes };
    if (seconds < 10) { seconds = "0" + seconds };

    return hours + ":" + minutes + ":" + seconds;
  },
  render: function() {
    var totalTime = this.convertTime(this.props.totalTime);
    return (
      <div className="totalTime">{totalTime}</div>
    )
  }
});

module.exports = TotalTime;
