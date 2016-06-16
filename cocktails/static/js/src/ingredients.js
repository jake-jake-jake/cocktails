var React = require('react');

var Ingredients = React.createClass({
  componentDidMount: function() {
    if(this.props.items.length==1){
      this.props.select(this.props.items[0].id);
    }
  },

  handleClick: function(item) {
    // Pass item id to be queried by App.getDrinks
    this.props.select(item.id);
  },

  render: function() {
    // Create list of items from props; I am not sure if this is best practice.
    var listitems = this.props.items
    if(this.props.items.length < 1) {
      return null;
    }

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