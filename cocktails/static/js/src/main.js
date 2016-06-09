var React = require('react');
var ReactDOM = require('react-dom');

var Drink         = require('./drink.js');
var DrinkDetail   = require('./drinkDetail.js');
var Ingredients   = require('./ingredients.js');
var Search        = require('./search.js');

var ingredientsPlaceholder = [{name: "Sweet Vermouth", pk: 1},
                              {name: "Bourbon", pk: 2},
                              {name: "Dry Vermouth", pk: 3},
                              {name: "Gin", pk: 4}]

var drinksPlaceholder = [{name: "Manhattan",
                        ings: ['2.0 ounces of Bourbon',
                               '.5 ounces of Sweet Vermouth'],
                        instructions: 'Manhattan instructions'},
                        {name: "Martini",
                         ings: ["2.0 ounces of Gin",
                                ".5 ounces of Dry Vermouth"],
                         instructions: 'Martini instructions'}]

var App = React.createClass({
  requestIngredientList:  function() {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", this.props.ingredientsURL, true);
      xhr.onload = function() {
        let ingsjson = JSON.parse(xhr.responseText);
        this.setState({ingredients: ingsjson});
      }.bind(this);
      xhr.send();
    },

  getInitialState: function() {
    return {
        drinks: [{name: "Manhattan",
                          ings: ['2.0 ounces of Bourbon',
                                 '.5 ounces of Sweet Vermouth'],
                          instructions: 'Manhattan instructions'},
                          {name: "Martini",
                           ings: ["2.0 ounces of Gin",
                                  ".5 ounces of Dry Vermouth"],
                           instructions: 'Martini instructions'}],
        ingredients: [],
        activeDrink: undefined,
        testDetail: {name: "Manhattan",
                          ings: ['2.0 ounces of Bourbon',
                                 '.5 ounces of Sweet Vermouth'],
                          instructions: 'Manhattan instructions'},
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
    var matches = this.state.ingredients.filter(function(elem, i, ings) {
      return elem.name.toUpperCase().indexOf(inp.toUpperCase()) >= 0;
    }, inp);
    if(!inp) {
      matches = []
    }
    this.setState({narrowedIngredients: matches})
  },
    
  selectDrink: function( activeDrink ) {
    this.setState({ activeDrink });
  },
  
  render: function() {
    return (
      <div className = "appContainer" >
        <h1>GIMME A DRINK</h1>
        <Search search = { this.search } />
        <Ingredients items = { this.state.narrowedIngredients } 
                     select = { this.getDrinks } />
        <Drink items = {this.state.drinks}
               select = {this.selectDrink} />
        <DrinkDetail drink = { this.state.testDetail } />
      </div>
      );
  }
  
  
});


ReactDOM.render(
  <App ingredientsURL='../ingredients.json'
       drinksURL='ingredientsearch/' />,
  document.getElementById('content')
);