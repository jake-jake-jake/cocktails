var React = require('react');
var ReactDOM = require('react-dom');

// CSRF token via JS-Cookie
var Cookies = require('js-cookie')
var csrftoken = Cookies.get('csrftoken')

var Drink         = require('./drink.js');
var DrinkDetail   = require('./drinkDetail.js');
var Ingredients   = require('./ingredients.js');
var Search        = require('./search.js');
// var Modal         = require('./modal.js')
// var PutForm       = require('./putform.js')

/* variable for modal form props
  let ingPutProps = {header: "Add an ingredient",
                       fields: [{placeholder: "Ingredient Name", type: "text", name: "name"},
                               {placeholder: "ABV", type: "number", step: .5, name: "abv"},
                               {placeholder: "Type", type: "text", name: "type"}],
                       url: this.props.addIngredientURL,
                       className: "putForm",
                       buttonText: "Add Ingredient"
                      }; */

/* Component for add ingredent modal; lives at bottom of App component.
        <div className='modalContainer'>
          <button className="loginButton" onClick={this.toggleModal}>Add Something</button>
          <Modal show={this.state.showModal}
                 toggle={this.toggleModal}
                 formprops={ingPutProps}
                 csrftoken={this.props.csrftoken} />
        </div>
*/



var App = React.createClass({
  // Takes two props from the call to ReactDOM: 
  // 
  // ingredientsURL --> used to query ingredients 
  // drinksURL      --> used to query drinks, by ingredient pk
  // 
  // 

  getInitialState: function() {
    return {
        drinks: [],
        ingredients: [],
        activeDrink: {name: "", ings: [], instructions: ""},
        lastDrinkSearch: '',
        narrowedIngredients: [],
        showModal: false
    };
  },
  
  componentDidMount: function() {
    this.requestIngredientList();
  },
  
  search: function(text) {
    // Strip user input text of spaces; set array of ingredients that have
    // stripped text in their name to state.
    let inp = text.trim();
    var drinks = this.state.drinks
    var matches = this.state.ingredients.filter(function(elem, i, ings) {
      return elem.name.toUpperCase().indexOf(inp.toUpperCase()) >= 0;
    }, inp);
    if(matches.length==1){
      this.getDrinks(matches[0].id)
    }
    if(!inp) {
      matches = []
      drinks = []
    }
    this.setState({drinks: drinks, narrowedIngredients: matches})
  },
  
  requestIngredientList:  function() {
    // Make an API call to grab list of ingredients
    let xhr = new XMLHttpRequest();
    xhr.open("GET", this.props.ingredientsURL, true);
    xhr.onload = function() {
      let ings = JSON.parse(xhr.responseText);
      this.setState({ingredients: ings});
    }.bind(this);
    xhr.send();
  },

  getDrinks: function(pk) {
    // Query API for drinks using ingredient tied to primary key
    let xhr = new XMLHttpRequest();
    let url = this.props.drinksURL + pk.toString() + '.json'
    if(url==this.state.lastDrinkSearch){
      return
    }
    xhr.open("GET", url, true);
    xhr.onload = function() {
      let drinks = JSON.parse(xhr.responseText);
      this.setState({drinks: drinks, lastDrinkSearch: url});
      if(drinks.length==1){
        this.selectDrink(drinks[0]);
      }
    }.bind(this);
    xhr.send();
  },

  selectDrink: function( activeDrink ) {
    this.setState({activeDrink: activeDrink});
  },

  toggleModal: function() {
    this.setState({showModal: !this.state.showModal})
  },

  
  render: function() {
    var tryone = 'Why don\'t you try one of these?'
    return (
      <div className = "appContainer" >
        <h1>Make Yourself a Drink</h1>
        <Search search={this.search} />
        <Ingredients header='Ingredients'
                     autofocus="true"
                     items={this.state.narrowedIngredients} 
                     select={this.getDrinks}/>
        <Drink header={tryone}
               items={this.state.drinks}
               select={this.selectDrink} />
        <DrinkDetail drink = { this.state.activeDrink } />
      </div>
      );
  }
});


ReactDOM.render(
  <App ingredientsURL='ingredients.json'
       drinksURL='ingredientsearch/'
       addIngredientURL='addingredient'
       csrftoken={csrftoken} />,
  document.getElementById('content')
);