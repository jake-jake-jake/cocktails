var React = require('react');
var ReactDOM = require('react-dom');

var Drink         = require('./drink.js');
var DrinkDetail   = require('./drinkDetail.js');
var Ingredients   = require('./ingredients.js');
var Search        = require('./search.js');

var App = React.createClass({
  getInitialState: function() {
    return {
        drinks: [],
        ingredients: [],
        activeDrink: {name: "", ings: [], instructions: ""},
        lastDrinkSearch: '',
        narrowedIngredients: []
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
    // Using vanilla JS, make an API call to grab list of ingredients
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
    // console.log('.selectDrink method of App; param activeDrink:')
    // console.log(activeDrink)
    this.setState({ activeDrink: activeDrink });
  },
  
  render: function() {
    var tryone = 'Why don\'t you try one of these?'
    return (
      <div className = "appContainer" >
        <h1>Make Yourself a Drink</h1>
        <Search search={ this.search } />
        <Ingredients header='Ingredients'
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
       drinksURL='ingredientsearch/' />,
  document.getElementById('content')
);