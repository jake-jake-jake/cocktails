var React = require('react');

var DrinkDetail = React.createClass({
  getDefaultProps: function() {
    return {
    }
  },
  
  render: function() {
    var ings = this.props.drink.ings.map(function(ing, i) {
                return ( <li key = { i }>
                          { ing }
                        </li> )
                });
    return (
      <div className = "drinkDetail">
        <h3>{ this.props.drink.name }</h3>
        <ul> { ings } </ul>
        { this.props.drink.instructions }
      </div>
    )
  }
  
  
});

module.exports = DrinkDetail;