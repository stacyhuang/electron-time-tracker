var React = require("react");
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var Sidebar = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {id: undefined, project: "", client: "", totalTime: undefined};
  },
  componentWillReceiveProps: function(nextProps) {
    if (this.state.id !== nextProps.task.id) {
      this.setState({
        id: nextProps.task.id,
        project: nextProps.task.project,
        client: nextProps.task.client,
        totalTime: nextProps.task.totalTime
      });
    }
  },
  handleSubmit: function(event) {
    event.preventDefault();

    var task = {
      id: this.props.task.id,
      project: this.state.project,
      client: this.state.client,
      totalTime: parseInt(this.state.totalTime),
      paused: this.props.task.paused
    };

    this.props.onUpdateTask(this.props.task.id, task);
    this.setState({project: "", client: "", totalTime: undefined});
  },
  render: function() {
    return (
      <div className="sidebar row">
        <form className="form-group">
          <label htmlFor="input-project-name">Project Name</label>
          <input
            type="text"
            valueLink={this.linkState("project")}
            ref="project"
            className="form-control"
            id="input-project-name"
          />
          <label htmlFor="input-client-name">Client Name</label>
          <input
            type="text"
            valueLink={this.linkState("client")}
            ref="client"
            className="form-control"
            id="input-client-name"
          />
          <label htmlFor="input-total-time">Duration (sec)</label>
          <input
            type="number"
            valueLink={this.linkState("totalTime")}
            ref="totalTime"
            className="form-control"
            id="input-total-time"
          />
          <button type="submit" className="btn btn-primary pull-right" onClick={this.handleSubmit}>Save</button>
        </form>
      </div>
    )
  }
});

module.exports = Sidebar;
