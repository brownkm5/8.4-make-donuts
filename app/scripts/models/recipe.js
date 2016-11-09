var Backbone = require('backbone');

var Ingredient = Backbone.Model.extend({
  defaults: {
    name: '',
    quantity: '',
    unit:''
  }
});

var IngredientCollection = Backbone.Collection.extend({
  model: Ingredient,
  baseUrl: 'https://kevinbrowntown.herokuapp.com/classes/Ingredient'
});

var Recipe = Backbone.Model.extend({
  defaults: {
    ingredients: new IngredientCollection()
  },
  urlRoot: 'https://kevinbrowntown.herokuapp.com/classes/Recipes'
});

var RecipeCollection = Backbone.Collection.extend({
  model: Recipe,
  url: 'https://kevinbrowntown.herokuapp.com/classes/Recipes'
});

module.exports = {
  Ingredient: Ingredient,
  IngredientCollection: IngredientCollection,
  Recipe: Recipe,
  RecipeCollection: RecipeCollection
};
