var React = require("react");
var Task = require("./Task");

var TaskList = React.createClass({
  propTypes: {
    tasks: React.PropTypes.object.isRequired,
    onToggleTime: React.PropTypes.func.isRequired,
    onToggleSidebar: React.PropTypes.func.isRequired
  },
  render: function() {
    var taskNodes = [];
    var tasks = this.props.tasks;
    for (var key in tasks) {
      taskNodes.push(
        <Task
          key={key}
          id={key}
          project={tasks[key].project}
          client={tasks[key].client}
          totalTime={tasks[key].totalTime}
          onToggleTime={this.props.onToggleTime.bind(null, key)}
          onToggleSidebar={this.props.onToggleSidebar.bind(null, key)}
        />
      )
    }
    return (
      <div className="taskList">
        {taskNodes}
      </div>
    )
  }
});

module.exports = TaskList;
