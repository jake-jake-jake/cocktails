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
    return {submitted: false,

    }  
  },

  updateField: function(elem, event) {
    // Dynamically set form values; use submitted props as scaffold
    var name = elem.name;
    let value = event.target.value.trim();
    this.setState({[elem.name]: value})
  },

  getFormVals: function(elem, event) {
    // Crete submission object for form, using props as scaffold
    var submission = {};
    this.props.fields.map(function(elem) {
      var name = elem.name
      submission[name] = this.state[name];
    }.bind(this), submission);
    return submission;
  },

  putContent: function(e) {
    // Make a PUT request from the content of the form, derived from this.state values,
    // to the address at this.props.url
    e.preventDefault();
    console.log('You submitted the form.');
    let xhr = new XMLHttpRequest();
    let url = this.props.url;
    let submission = this.getFormVals();
    console.log('Submission value from .getFormVals(): ')
    console.log(submission)
    xhr.open("POST", url, true);
    xhr.setRequestHeader('X-CSRFToken', this.props.csrftoken)
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      this.setState({submitted: true});
      console.log('The request has been processed.');
    }.bind(this);
    xhr.send(JSON.stringify(submission));
  },

  render: function() {
    var formelements = this.props.fields
    if(!this.state.submitted) {
      return (
        <div className={this.props.className}>
          <h2>{this.props.header}</h2>
          <form onSubmit={this.putContent}>
            {formelements.map(function(elem, i) {
              var updateField = this.updateField.bind(this, elem)
              return <input key={i} onChange={updateField} {...elem} />
            }, this)}
            <input type="submit" value={this.props.buttonText} />
          </form>
        </div>
      )
    } else {
      return (
        <div className={this.props.className}>
          <h2>{this.props.header}</h2>
          <p>Thanks for your contribution.</p>
        </div>
      )
    }
  }
});

module.exports = PutForm;