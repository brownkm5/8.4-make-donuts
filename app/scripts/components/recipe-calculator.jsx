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
    var servingSize = JSON.parse(localStorage.getItem('serving'));
    // var number = parseInt(servingSize);
    // console.log(number);
    return {
      newServing: newServing,
      factor: factor,
      servingSize: servingSize
    }
  },
  handleSubmit: function(){
    var recipe = JSON.parse(localStorage.getItem('recipe'));
    var serving = recipe.serving;
    var newServing = this.state.newServing;

    var servingInt = parseInt(serving);
    var newServingInt = parseInt(newServing);

    //calculate the factor to multiply the ingredient qunatities by
    var answer = math(servingInt, newServingInt);
    this.setState({factor:answer});
    // console.log(answer);
  },
  handleInput: function(e){
    var newServing = e.target.value;
    this.setState({newServing: newServing});
    this.setState({servingSize: newServing});
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

    //when there wasnt a value in the text box for servings it would render servings
    //but still render 1 for the serving value in the sentence
    //setting it to or 1 makes it so when there is no value it still says serving
    var servingSize = this.state.servingSize || 1;

    //updates the word servings on the recipe card depending on if the serving number is one
    var servingsWord = function(){
      if (servingSize != 1) {
        return 'servings'
      }
      else {
        return 'serving'
      }
    }
    var word = servingsWord();
    // console.log(servingSize);
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
            <input onChange={self.handleInput} type="text" className="form-control" id="serving"  placeholder="How many servings would you like to make?" value={this.state.servingSize}/>
            <button type="submit" className="btn btn-default">Calculate Recipe</button>
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
