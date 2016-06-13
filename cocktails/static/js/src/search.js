var React = require('react');

var Search = React.createClass({
  mySearch: function(e) {
    this.props.search( e.target.value );
  }, 
  
  render: function() {
    return (
      <div className          = "searchContainer">
        <input  type          = "text"
                placeholder   = "What have you got?"
                onChange      = {this.mySearch} />
      </div>
      )
    
  }
});

module.exports = Search;