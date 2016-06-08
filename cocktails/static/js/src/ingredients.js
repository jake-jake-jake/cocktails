var React = require('react');

var Ingredients = React.createClass({
  
  logClick: function(item) {
    console.log(item)
  },

  render: function() {
    var listitems = this.props.items;
    return (
      <div className = "ingredientContainer">
        <ul>
          {listitems.map(function(item) {
            var boundclick = this.logClick.bind(this, item)
            return <li key={item.pk} onClick={boundclick}
                    >{item.name}</li>
          }, this)}
        </ul>
      </div>
      );
  }
});

module.exports = Ingredients;