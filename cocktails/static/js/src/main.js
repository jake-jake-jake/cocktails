var React = require('react');

var Search        = require('./search.js');
var Drink         = require('./drink.js');
var DrinkDetail   = require('./drinkDetail.js');

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
  
  search: function( value ) {
    //JQUERY GOES HERE
    //ON RESPONSE -> this.setState({})
    let narrowedIngredients = this.findIngredient(value);
    // if (!pk) return;
    
    this.setState({narrowedIngredients: narrowedIngredients})
   
  },
  
  findIngredient: function(inp) {
    if(!inp) {
      return [];
    }

    var matches = this.state.ingredients.filter(function(elem, i, ings) {
      return elem.name.toUpperCase().indexOf(inp.toUpperCase()) >= 0;
    }, inp);

    return matches;
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

    let ingredients = this.state.narrowedIngredients.map(function(ingredient, i) {
                        return <li>{ingredient.name}</li>
    });
    
    return (
      <div className = "mainContainer" >
        <Search search = { this.search } />
        <div className="ingredientContainer">
          <ul> {ingredients} </ul>
        </div>
        <div className = "foundDrink">
          { drinks }
          <h2>Drinks with that ingredient</h2>
          <DrinkDetail drink = { this.state.testDetail } />
        </div>
        
      </div>
      );
  }
  
  
});


ReactDOM.render(
  <App />,
  document.getElementById('content')
);