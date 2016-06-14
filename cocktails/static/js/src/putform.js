var React = require('react');

var PutForm = React.createClass({
  getDefaultProps: function() {
      return {header: "A Put Form",
              fields: [{placeholder: "A placeholder", type: "text"},
                       {placeholder: "Another placeholder", type: "text"},
                       {placeholder: "Another placeholder", type: "text"}],
              url: "/unset/url",
              className: "putForm",
              buttonText: "Button"
             };
  },

  putContent: function(e) {
    // Query API for drinks using ingredient tied to primary key
    e.preventDefault();
    console.log('You submitted the button.');
    console.log('This was the passed eect: ');
    console.log(e)
    return null
    if(!e) {
      console.log('Set some error handler here');
      return null;
    }
    let xhr = new XMLHttpRequest();
    let url = this.props.drinksURL + pk.toString() + '.json'
    if(url==this.state.lastDrinkSearch){
      return
    }
    xhr.open("put", url, true);
    xhr.onload = function() {
      let ingredient = JSON.parse(e);
      xhr.send();
    }
  },

  render: function() {
    var formelements = this.props.fields
    return (
      <div className={this.props.className}>
        <h3>{this.props.header}</h3>
        <form onSubmit={this.putContent}>
          {formelements.map(function(elem) {
          return <input {...elem} />
          }, this)}
          <input type="submit" value={this.props.buttonText} />
        </form>
      </div>
    )
  }
});

module.exports = PutForm;