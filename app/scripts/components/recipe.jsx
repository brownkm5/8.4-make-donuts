var React = require('react');
var $ = require('jquery');

var TemplateComponent = require('./template.jsx');

var model = require('../models/recipe.js');

var IngredientForm = React.createClass({
  getInitialState: function(){
    return this.props.ingredient.toJSON();
  },
  componentWillMount: function(){
    return this.props.ingredient.toJSON();
  },
  handleInput: function(e){
    var target = e.target;

    var newState = {};
    newState[target.name] = target.value;
    this.props.ingredient.set(target.name, target.value);

    this.setState(newState);

  },

  render: function(){
    return (
      <div className="form-inline">
        <input onChange={this.handleInput} type="text" className="form-control" name='name' id="ingredient" value={this.state.ingredient} placeholder="Ingredient"/>
        <input onChange={this.handleInput} type="number" className="form-control" name='quantity' id="quantity" value={this.state.quantity} placeholder="Quantity"/>
        <input onChange={this.handleInput} type="text" className="form-control" name='unit' id="unit" value={this.state.unit} placeholder="Unit"/>
      </div>
    )
  }
});


var RecipeForm = React.createClass({
  getInitialState: function(){
    return this.props.recipe.toJSON();
  },
  componentWillMount: function(){
    return this.props.recipe.toJSON();
  },
  handleInput: function(e){
    var target = e.target;

    var newState = {};
    newState[target.name] = target.value;
    this.setState(newState);
  },
  handleSubmitRecipe: function(e){
    e.preventDefault();
    // console.log(this.state);
    this.props.handleSubmitRecipe(this.state);
  },
  render: function(){
    var recipe = this.props.recipe;
    var self = this;

    var ingredientForm = recipe.get('ingredients').map(function(ingredient){
      return <IngredientForm key={ingredient.cid} ingredient={ingredient}/>
    });
    return (
     <form onSubmit={self.handleSubmitRecipe} className='col-sm-6'>
       <div className="form-group">
         <label htmlFor="recipe">Input recipe name here</label>
         <input onChange={self.handleInput} type="text" className="form-control" name='recipeName' id="recipe" value={self.state.name} placeholder="What does this recipe make?"/>
       </div>
       <div className='form-group'>
         <label htmlFor="serving">Serving Size</label>
         <input onChange={self.handleInput} type="text" className="form-control" name='serving' id="serving" value={self.state.serving} placeholder="How Many Servings Does This Recipe Make?"/>
       </div>
       <button type="button" onClick={this.props.addIngredient} className="btn btn-success">Add Ingredient</button>
       {ingredientForm}
       <button type="submit" className="btn btn-default">Save Recipe</button>
     </form>
   )
  }
});

var RecipeContainer = React.createClass({
  getInitialState: function(){
    return {
      recipe: new model.Recipe()
    }
  },
  componentWillReceiveProps: function(){
    // this.getRecipe();
  },
  componentWillMount: function(){
    this.ajaxSetup();
    // this.getRecipe();
  },
  getRecipe: function(){
    var recipe = this.state.recipe;

    recipe.fetch().then(() => {
      this.setState({recipe: recipe});
    });
    // console.log(this.state.recipe);
  },
  ajaxSetup: function(){
    var self = this;
    var token = localStorage.getItem('token');
    if(!token){
      self.props.router.navigate('', {trigger: true});
    }
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', 'kmbparse');
        xhr.setRequestHeader('X-Parse-REST-API-Key', 'kylesb');
      }
    });
  },
  addIngredient: function(){
    var recipe = this.state.recipe;
    var ingredients = recipe.get('ingredients');

    ingredients.add([{}]);

    this.setState({recipe: recipe});

  },
  handleSubmitRecipe: function(recipeData){
    var recipe = this.state.recipe;
    recipe.set(recipeData);
    // console.log('recipeData', recipe);
    recipe.save().then(function(){
      // console.log('worked');
    });
    this.props.router.navigate('recipe-list/', {trigger: true});
  },
  render: function(){
    return (
      <TemplateComponent>
        <div>
          <RecipeForm recipe={this.state.recipe} addIngredient={this.addIngredient} handleSubmitRecipe={this.handleSubmitRecipe}/>
        </div>
      </TemplateComponent>
    )
  }
});

module.exports = {
  RecipeContainer : RecipeContainer
}
