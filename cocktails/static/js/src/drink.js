var React = require('react');

var Drink = React.createClass({
  render: function() {
    let activeClass = this.props.active ? " active" : "";
    return (
      <div  className = { "drink" + activeClass }
            onClick   = { function() {
                            this.props.select( this.props.index );
                          }.bind(this) } >
        Name: { this.props.drink.name }
      </div>
      )
  }
});

module.exports = Drink;