var React = require('react');

var Search = React.createClass({
  mySearch: function(e) {
    this.props.search( e.target.value.trim() );
  },
  
  render: function() {
    return (
      <div className = "flexCol search">
        <input  type="text"
                value = "Enter ingredient to search"
                onSubmit    = { this.mySearch } />
        <button value   = "Search"
                onClick = { this.mySearch } />
      </div>
      )
    
  }
});

module.exports = Search;