var React = require('react');
var Modal         = require('./modal.js')

var Search = React.createClass({
  getInitialState: function() {
    return {showModal: false}
  },

  openModal: function() {
    this.setState({showModal: true})
  },

  mySearch: function(e) {
    this.props.search( e.target.value );
  }, 
  
  render: function() {
    return (
      <div className          = "searchContainer">
        <input  type          = "text"
                placeholder   = "What have you got?"
                onChange      = {this.mySearch} />
        <button onClick={this.openModal}>?</button>
        <Modal className='searchModal' show={this.state.showModal} />
      </div>
      )
    
  }
});

module.exports = Search;