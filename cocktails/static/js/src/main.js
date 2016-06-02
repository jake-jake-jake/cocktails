var React = require('react');

var Search        = require('./search.js');
var Drink         = require('./drink.js');
var DrinkDetail   = require('./drinkDetail.js');


var App = React.createClass({
  getInitialState: function() {
    return {
        drinks: [ {name: "nameSample", ings: [], instructions: ""}   ]
      , ings: [ { name: "PeanutButter", pk: 0, detail: "Delicious and buttery" }
              , { name: "Jelly", pk: 1, detail: "SWEEEET" }
              ]
      , ingredient: null
      , activeDrink: undefined
      , testDetail: { name: "SAMPLE NAME"
                     , ings: ["blood", "sweat", "tears"]
                     , instructions: "lollerskates" }
    };
    
  },
  
  requestIngredientList: function() {
    
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