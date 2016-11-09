var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var LoginContainer = require('./components/login.jsx').LoginContainer;
var RecipeContainer = require('./components/recipe.jsx').RecipeContainer;
var RecipeCalculator = require('./components/recipe-calculator.jsx').CalculatorContainer;
var RecipeList = require('./components/recipe-list.jsx').ListContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'new-recipe/': 'recipe',
    'recipe-calculator/': 'recipeCalculator',
    'recipe-list/': 'recipeList'
  },
  index: function(){
    ReactDOM.render(
      React.createElement(LoginContainer, {router : this}),
      document.getElementById('app')
    )
  },
  recipe: function(){
    ReactDOM.render(
      React.createElement(RecipeContainer, {router:this}),
      document.getElementById('app')
    )
  },
  recipeCalculator: function(){
    ReactDOM.render(
      React.createElement(RecipeCalculator, {router:this}),
      document.getElementById('app')
    )
  },
  recipeList: function(){
    ReactDOM.render(
      React.createElement(RecipeList, {router:this}),
      document.getElementById('app')
    )
  }
});


var router = new AppRouter();

module.exports = router;
