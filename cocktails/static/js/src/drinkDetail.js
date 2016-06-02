var React = require('react');

var DrinkDetail = React.createClass({
  getDefaultProps: function() {
    return {
    }
  },
  
  render: function() {
    console.log("props:", this.props);
    let ings = this.props.drink.ings.map(function(ing, i) {
                return ( <li key = { i }>
                          { ing }
                        </li> )
                });
    return (
      <div className = "drinkDetail flexCol">
        <h1>{ this.props.drink.name }</h1>
        <ul> { ings } </ul>
        { this.props.drink.instructions }
      </div>
    )
  }
  
  
});

module.exports = DrinkDetail;