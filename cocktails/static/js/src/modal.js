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

  componentWillReceiveProps: function(nextProps){
    if(nextProps.show != this.state.show) {
      this.setState({show: nextProps.show})
    }
  },

  getInitialState: function() {
      return {opacity: this.props.opacity,
              display: this.props.display,
              visibility: this.props.visibility,
              show: this.props.show            
      };
  },
  
  handleClick: function() {
    this.props.toggle.call();
  },

  render: function() {
    console.log(this.props)
    if(!this.state.show) {
      return null
    }
    return (
      <div className="mainModal">
        <div className="inner">
            <h2>Add an Ingredient</h2>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="ABV" />
            <input type="text" placeholder="Type" />
            <button onClick={this.handleClick}>Close</button>
        </div>
      </div>
    )
  }
});

module.exports =  Modal;