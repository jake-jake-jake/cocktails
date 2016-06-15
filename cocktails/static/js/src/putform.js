var React = require('react');

/* Super rad modular form submitter. It makes a put request to the url in the props. 
** Form fields dynamically set via the array of objects in the fields property. 
** Check default props for more info or modify this one as you need:
             {header: "A Put Form",
              fields: [{placeholder: "Email placeholder", type: "text", name: "Email"},
                       {placeholder: "Number placeholder", type: "number", step:.5, name: "number"},
                       {placeholder: "Addr placeholder", type: "text", name: "Address"}],
              url: "/unset/url",
              className: "putForm",
              buttonText: "Button"
             };
*/

var PutForm = React.createClass({
  getDefaultProps: function() {
      return {header: "DEFAULT FORM VALUES",
              fields: [{placeholder: "Email placeholder", type: "text", name: "Email"},
                       {placeholder: "Name placeholder", type: "text", name: "Name"},
                       {placeholder: "Addr placeholder", type: "text", name: "Address"}],
              url: "/unset/url",
              className: "putForm",
              buttonText: "Button"
             };
  },

  getInitialState: function() {
    return {}  
  },

  updateField: function(elem, event) {
    var name = elem.name;
    let value = event.target.value;
    this.setState({[elem.name]: value})
  },

  putContent: function(e) {
    // Make a PUT request from the content of the form, derived from this.state values,
    // to the address at this.props.url
    e.preventDefault();
    console.log('You submitted the button.');
    if(!e) {
      console.log('Set some error handler here');
      return null;
    }
    let xhr = new XMLHttpRequest();
    let url = this.props.url
    xhr.open("PUT", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      let ingredient = this.state;
      console.log(ingredient)
      xhr.send();
    }.bind(this);
    xhr.send();
  },

  render: function() {
    var formelements = this.props.fields
    return (
      <div className={this.props.className}>
        <h3>{this.props.header}</h3>
        <form onSubmit={this.putContent}>
          {formelements.map(function(elem, i) {
            var updateField = this.updateField.bind(this, elem)
            return <input key={i} onChange={updateField} {...elem} />
          }, this)}
          <input type="submit" value={this.props.buttonText} />
        </form>
      </div>
    )
  }
});

module.exports = PutForm;