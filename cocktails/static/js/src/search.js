var React = require('react');
var Modal         = require('./modal.js')

var Search = React.createClass({
  getInitialState: function() {
    return {showModal: false}
  },

  toggleModal: function() {
    console.log('CLICK CLICK')
    console.log(this.state.showModal)
    this.setState({showModal: !this.state.showModal})
    console.log(this.state.showModal)
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
        <button onClick={this.toggleModal}>?</button>
        <Modal className='searchModal' show={this.state.showModal} />
      </div>
      )
    
  }
});

module.exports = Search;