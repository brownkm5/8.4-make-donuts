var React = require('react');
var $ = require('jquery');

var TemplateComponent = require('./template.jsx');

var math = function (originalServingSize, newServingSize){
  return newServingSize / originalServingSize;
}

var CalculatorComponent = React.createClass({
  getInitialState: function(){
    var newServing = '';
    var factor = 1;
    return {
      newServing: newServing,
      factor: factor
    }
  },
  handleSubmit: function(){
    var recipe = JSON.parse(localStorage.getItem('recipe'));
    var serving = recipe.serving;
    var newServing = this.state.newServing;

    // console.log('wty', recipe.ingredients);
    //pretty sure this needs to go in handle input
    //also need to set the state of the recipe serving coming in so that i can use
    //that in handleInput to do the math there so it happens on change and not
    //on submit of the button, unless i change it to calculate recipe button
    var ingredients = recipe.ingredients;
    var ingredientList = ingredients.map(function(ingredient){
      // console.log(ingredient.quantity);
    });
    var servingInt = parseInt(serving);
    var newServingInt = parseInt(newServing);

    //this.setState({serving: servingInt, newServing: newServingInt});
    var answer = math(servingInt, newServingInt);
    this.setState({factor:answer});
    // console.log(answer);
  },
  handleInput: function(e){
    var newServing = e.target.value;
    this.setState({newServing: newServing});
    // console.log(newServing);
  },
  render: function(){
    var self = this;
    var recipe = JSON.parse(localStorage.getItem('recipe'));
    var ingredients = recipe.ingredients;

    var factor = this.state.factor;

    var ingredientList = ingredients.map(function(ingredient){
      var adjustedQuantity = ingredient.quantity * factor;
      var amount = adjustedQuantity.toFixed(2);
      return <li key={ingredient.name}>{amount} {ingredient.unit} of {ingredient.name}</li>
    });
    var servingsWord = function(){
      if (factor === 1) {
        return 'serving'
      }
      else {
        return 'servings'
      }
    }
    var word = servingsWord();
    // console.log(servingsWord);
    return (
      <div className="col-sm-7 col-sm-offset-2">
        <div className='jumbotron'>
          <h3>Recipe for: {recipe.recipeName}</h3>
          <h3>Servings: This recipe makes {this.state.newServing || recipe.serving} {word}.</h3>
          <h4>Ingredients:</h4>
          <ul>
            {ingredientList}
          </ul>
          <form onSubmit={self.handleSubmit} className='form-group'>
            <label htmlFor="update">Update serving size</label>
            <input onChange={self.handleInput} type="text" className="form-control" id="serving"  placeholder="How many servings would you like to make?"/>
            <button type="submit" className="btn btn-default">Update Recipe</button>
          </form>
        </div>
      </div>
    )
  }
});

var CalculatorContainer = React.createClass({
  componentWillMount: function(){
    var self = this;
    var token = localStorage.getItem('token');
    if(!token){
      self.props.router.navigate('', {trigger: true});
    }
  },
  render: function(){
    return (
      <TemplateComponent>
        <CalculatorComponent />
      </TemplateComponent>
    )
  }
});

module.exports = {
  CalculatorContainer: CalculatorContainer
}
