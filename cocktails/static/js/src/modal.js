var React = require('react');

// Modal class with four default props:
// opacity = level of transparency of takeover
// display = block or inline
// visibility = hidden
// show = true or false 
var Modal = React.createClass({
  getDefaultProps: function() {
    return {opacity: 50,
            display: 'block',
            visibility: 'hidden',
            show: 'false'};
  },

  getInitialState: function() {
      return {opacity: this.props.opacity,
              display: this.props.display,
              visibility: this.props.visibility,
              show: this.props.show            
      };
  },
  
  handleClick: function() {
    this.setState({show: !this.state.show})
  },

  render: function() {
    if(!this.state.show) {
      return null
    }
    return (
      <div className = "searchModal">
        <h2>THIS IS THE SEARCH MODAL</h2>
        <p onClick={this.handleClick}>CLICK</p>
      </div>
    )
  }
});

module.exports =  Modal;