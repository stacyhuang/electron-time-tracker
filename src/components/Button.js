var React = require("react");

var Button = React.createClass({
  propTypes: {
    iconClassName: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <i className={this.props.iconClassName} onClick={this.props.onClick}></i>
    );
  }
});

module.exports = Button;
