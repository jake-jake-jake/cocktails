var React = require('react');

var Drink = React.createClass({
  componentDidMount: function() {
    if(this.props.items.length==1) {
      this.props.select(this.props.items[0])
    }
  }, 

  handleClick: function(item) {
    // control for select; the Drink module passes the whole item to the
    // next component
    this.props.select(item);
  },
  
  render: function() {
    var listitems = this.props.items
    if(this.props.items.length < 1){
      return null;
    }
    return (
      <div className = "drinkContainer">
        <h2>{this.props.header}</h2>
        <ul>
          {listitems.map(function(item) {
            var boundclick = this.handleClick.bind(this, item)
            return <li key={item.pk} onClick={boundclick}>{item.name}</li>
          }, this)}
        </ul>
      </div>
      )
  }
});

module.exports = Drink;