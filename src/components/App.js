var React = require("react");
var TaskForm = require("./TaskForm");
var TaskList = require("./TaskList");
var Sidebar = require("./Sidebar");
var classNames = require("classnames");
var ipcRenderer = electron.ipcRenderer;

var timer;

var App = React.createClass({
  getInitialState: function() {
    return {tasks: {}, editing: {}, sidebarCollapsed: true};
  },
  onAddTask: function(id, task) {
    var tasks = this.state.tasks;
    tasks[id] = task;
    this.setState({tasks: tasks});
    this.onToggleTime(id);
  },
  onUpdateTask: function(id, task) {
    var tasks = this.state.tasks;
    tasks[id] = task;
    this.setState({tasks: tasks, sidebarCollapsed: true})
    ipcRenderer.send("toggle-sidebar");
  },
  onToggleTime: function(id) {
    var tasks = this.state.tasks;
    this.stopTimer();

    for(var key in tasks) {
      if (key === id && tasks[key]["paused"]) {
        this.startTimer(id);
        tasks[key]["paused"] = false;
      } else {
        tasks[key]["paused"] = true;
      }
      this.setState({tasks: tasks});
    }
  },
  onToggleSidebar: function(id) {
    var tasks = this.state.tasks;
    var task = tasks[id];

    if (this.state.sidebarCollapsed) {
      this.setState({editing: tasks[id], sidebarCollapsed: false});
      ipcRenderer.send("toggle-sidebar");
    } else {
      if (this.state.editing.id !== id) {
        this.setState({editing: tasks[id]});
      } else {
        ipcRenderer.send("toggle-sidebar");
      }
    }
  },
  startTimer: function(id) {
    timer = setInterval(function() {
      var tasks = this.state.tasks;
      tasks[id]["totalTime"] = tasks[id]["totalTime"] + 1;
      this.setState({tasks: tasks});
    }.bind(this), 1000);
  },
  stopTimer: function() {
    window.clearInterval(timer);
  },
  render: function() {
    var sidebarClass = classNames("sidebar-container", {"sidebar-collapsed": this.state.sidebarCollapsed});
    return (
      <div className="app row">
        <div className="task-container">
          <TaskForm onAddTask={this.onAddTask} />
          <TaskList
            tasks={this.state.tasks}
            onToggleTime={this.onToggleTime}
            onToggleSidebar={this.onToggleSidebar}
          />
        </div>
        <div className={sidebarClass}>
          <Sidebar task={this.state.editing} onUpdateTask={this.onUpdateTask} />
        </div>
      </div>
    )
  }
});

module.exports = App;
