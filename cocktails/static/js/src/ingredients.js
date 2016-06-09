var React = require('react');

var Ingredients = React.createClass({
  
  handleClick: function(item) {
    // Pass item id to be queried by App.getDrinks
    this.props.select(item.id)
  },

  render: function() {
    var listitems = this.props.items;
    return (
      <div className = "ingredientContainer">
        <ul>
          {listitems.map(function(item) {
            var boundclick = this.handleClick.bind(this, item)
            return <li key={item.pk} onClick={boundclick}
                    >{item.name}</li>
          }, this)}
        </ul>
      </div>
      );
  }
});

module.exports = Ingredients;