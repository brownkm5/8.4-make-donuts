var RecipeForm = React.createClass({
  handleInput: function(){

  },
  render: function(){
    return(
      <form className='col-sm-7'>
        <div className="form-group">
          <label htmlFor="recipe">Recipe Name</label>
          <input type="text" className="form-control" id="recipe" placeholder="Recipe Name"/>
        </div>
        <div className="form-group">
          <label htmlFor="servings">Servings</label>
          <input type="text" className="form-control" id="servings" placeholder="How many servings does this recipe make?"/>
        </div>
        <button type="button" className="btn btn-success">Save Recipe</button>
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

  saveRecipe: function(recipeData){
    var recipe = this.state.recipe;
    recipe.set(recipeData);
  },

  render: function(){
    return (
      <TemplateComponent>
        <RecipeForm />
      </TemplateComponent>
    )
  }
});
