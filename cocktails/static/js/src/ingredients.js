var React = require('react');

var Ingredients = React.createClass({
  
  handleClick: function(item) {
    console.log('Logging within Ingredient component; you clicked on an li')
    console.log(item)
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