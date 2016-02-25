var React = require("react");
var TotalTime = require("./TotalTime");
var Button = require("./Button");

var Task = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
    project: React.PropTypes.string.isRequired,
    totalTime: React.PropTypes.number.isRequired,
    onToggleTime: React.PropTypes.func.isRequired,
    onToggleSidebar: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className="task row">
        <div className="col-xs-3">
          <TotalTime totalTime={this.props.totalTime} />
        </div>
        <div className="task-description col-xs-6" onClick={this.props.onToggleSidebar}>
          <div className="project-name">{this.props.project}</div>
          <div className="client-name">{this.props.client}</div>
        </div>
        <div className="col-xs-3 button">
          <Button onClick={this.props.onToggleTime} iconClassName="fa fa-clock-o fa-2x" />
        </div>
      </div>
    )
  }
});

module.exports = Task;
