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
        ingredients: [{name: "Sweet Vermouth", pk: 1},
                              {name: "Bourbon", pk: 2},
                              {name: "Dry Vermouth", pk: 3},
                              {name: "Gin", pk: 4}],
        activeDrink: undefined,
        testDetail: {name: "Manhattan",
                          ings: ['2.0 ounces of Bourbon',
                                 '.5 ounces of Sweet Vermouth'],
                          instructions: 'Manhattan instructions'},
        narrowedIngredients: []
    };
    
  },
  
  requestIngredientList: function() {
    // AJAX call to ingredients API
  },
  
  search: function(text) {
    // Strip user input text of spaces; set array of ingredients that have
    // stripped text in their name to state.
    let inp = text.trim()
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
    let drinks = this.state.drinks.map(function(drink, i) {
                    return <Drink name   = { drink.name }
                                  index   = { i }
                                  key     = { i }
                                  active  = { i == this.state.activeDrink }
                                  select  = { this.selectDrink }
                                  />
    }.bind(this) );
    return (
      <div className = "appContainer" >
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
  <App />,
  document.getElementById('content')
);