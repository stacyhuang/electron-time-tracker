var React = require("react");
var Button = require("./Button");
var _ = require("lodash");

var TaskForm = React.createClass({
  propTypes: {
    onAddTask: React.PropTypes.func.isRequired
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var input = this.refs.project;
    var project = input.value;
    input.value = "";

    if (project.trim()) {
      var id = _.uniqueId();
      var task = {
        id: id,
        project: project,
        totalTime: 0,
        paused: true
      }
      this.props.onAddTask(id, task);
    }
  },
  render: function() {
    return (
      <div className="taskForm row">
        <form className="col-xs-9" onSubmit={this.handleSubmit}>
          <input
            type="text"
            ref="project"
            className="input-new-project"
            placeholder="Add New Task"
          />
        </form>
        <div className="col-xs-3 button">
          <Button onClick={this.handleSubmit} iconClassName="fa fa-plus-circle fa-2x" />
        </div>
      </div>
    )
  }
});

module.exports = TaskForm;
