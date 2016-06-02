var React = require('react');

var App = React.createClass({
  getInitialState: function() {
    return {
      
      
    };
    
  },
  
  render: function() {
    return (
      <div>
        SOME GENERIC CONTENT
      </div>
      );
  }
  
  
});



//**********************************Page initialization
ReactDOM.render(
  <App />,
  document.getElementById('content')
);