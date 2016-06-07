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
        drinks: drinksPlaceholder
      , ingredient: ingredientsPlaceholder
      , activeDrink: undefined
      , testDetail: drinks[0]
    };
    
  },
  
  requestIngredientList: function() {
    // AJAX call to ingredients API
  },
  
  search: function( value ) {
    //JQUERY GOES HERE
    //ON RESPONSE -> this.setState({})
      
    let pk = this.findIngredient( value );
    if (!pk) return;
    
    // this.setState({ ingredient})
   
   console.log(pk);
   
  },
  
  findIngredient: function(text) {
    text = text.toUpperCase();
    for (let ing of this.state.ings) {
      if (ing.name
             .toUpperCase()
             .indexOf( text ) )
               return ing.pk;
    }
    return null;
  },
  
  selectDrink: function( activeDrink ) {
    this.setState({ activeDrink });
  },
  
  render: function() {
    let drinks = this.state.drinks.map(function(drink, i) {
                    return <Drink drink   = { drink }
                                  index   = { i }
                                  key     = { i }
                                  active  = { i == this.state.activeDrink }
                                  select  = { this.selectDrink }
                                  />
                  }.bind(this) );
    
    console.log("boop");
    
    return (
      <div className = "flexCol" >
        <Search search = { this.search } />
        
        <div>Ingredient: whatever</div>
        
        <div className = "flex">
          { drinks }
          <DrinkDetail drink = { this.state.testDetail } />
        </div>
        
      </div>
      );
  }
  
  
});



//**********************************Page initialization
ReactDOM.render(
  <App />,
  document.getElementById('content')
);