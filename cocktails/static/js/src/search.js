var React = require('react');

var Search = React.createClass({
  getInitialState: function() {
    return {
      input: "searchInput"
    }
    
  },
  
  mySearch: function() {
    let value = document.getElementById( this.state.input ).value;
    this.props.search( value );
  },
  
  render: function() {
    return (
      <div className = "flexCol search">
        <input  id = { this.state.input }
                placeholder = "Enter ingredient to search"
                onSubmit    = { this.mySearch } />
        <button value   = "Search"
                onClick = { this.mySearch } />
      </div>
      )
    
  }
});

module.exports = Search;