var React = require('react');

var Search = React.createClass({
  mySearch: function(e) {
    this.props.search( e.target.value );
  },
  
  render: function() {
    return (
      <div className          = "searchBox">
        <input  type          = "text"
                placeholder   = "Enter ingredient to search"
                onChange      = {this.mySearch} />
      </div>
      )
    
  }
});

module.exports = Search;