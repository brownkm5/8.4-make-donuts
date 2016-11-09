var React = require('react');
var $ = require('jquery');

var TemplateComponent = require('./template.jsx');

var math = function (originalServingSize, newServingSize){
  return newServingSize / originalServingSize;
}

var CalculatorComponent = React.createClass({
  getInitialState: function(){
    var newServing = '';
    var ingredient
    return {
      newServing: newServing
    }
  },
  handleSubmit: function(){
    var recipe = JSON.parse(localStorage.getItem('recipe'));
    var serving = recipe.serving;
    var newServing = this.state.newServing;

    console.log(recipe.quantity);

    var servingInt = parseInt(serving);
    var newServingInt = parseInt(newServing);

    var answer = math(servingInt, newServingInt);

  },
  handleInput: function(e){
    var newServing = e.target.value;
    this.setState({newServing: newServing});
    console.log(newServing);
  },
  render: function(){
    var self = this;
    var recipe = JSON.parse(localStorage.getItem('recipe'));
    var ingredients = recipe.ingredients;

    var ingredientList = ingredients.map(function(ingredient){
      return <li key={ingredient.name}>{ingredient.quantity} {ingredient.unit} of {ingredient.name}</li>
    });
    
    return (
      <div className="col-sm-7 col-sm-offset-2">
        <div className='jumbotron'>
          <h3>Recipe for: {recipe.recipeName}</h3>
          <h3>Servings: This recipe makes {recipe.serving} serving.</h3>
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
