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
      <div className = "detailContainer">
        <h2>{ this.props.drink.name }</h2>
        <ul> { ings } </ul>
        <p>{ this.props.drink.instructions }</p>
      </div>
    )
  }
  
  
});

module.exports = DrinkDetail;