var React = require('react');

var Drink = React.createClass({
  logClick: function(item) {
    console.log(item)
  },
  
  render: function() {
    var header = 'Drinks with that ingredient';
    var listitems = this.props.items;
    if(listitems.length < 1) {
      header = ''
    }

    return (
      <div className = "drinkContainer">
        <h3>{header}</h3>
        <ul>
          {listitems.map(function(item) {
            var boundclick = this.logClick.bind(this, item)
            return <li key={item.pk} onClick={boundclick}
                    >{item.name}</li>
          }, this)}
        </ul>
      </div>
      )
  }
});

module.exports = Drink;