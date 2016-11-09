var React = require('react');
var $ = require('jquery');

var TemplateComponent = require('./template.jsx');

var ListComponent = React.createClass({
  getInitialState: function(){
    return {
      recipes:[]
    }
  },
  componentWillMount: function(){
    var self = this;
    $.ajax('https://kevinbrowntown.herokuapp.com/classes/Recipes').then(recipeList);
    function recipeList(data){
     self.setState({recipes: data.results});
    }
  },
  render: function(){
    var self = this;
    var recipes = this.state.recipes;

    // console.log(recipes);
    var recipeList = recipes.map(function(recipeData){
      return (
        <li className='list-group-item' key={recipeData.objectId}>
          <h4 className='list-group-item-heading'>Recipe For: {recipeData.recipeName}</h4>
            <button onClick={function(){self.props.handleCalculator(recipeData)}} className='btn btn-success' type="button" name="button">Calculate Recipe</button>
          </li>
      )
    });
    return (
      <ul className='list-group'>{recipeList}</ul>
    )
  }
});

var ListContainer = React.createClass({
  componentWillMount: function(){
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
  handleCalculator:function(recipeData){
    var servingSize = JSON.stringify(recipeData.serving);
    var recipeData = JSON.stringify(recipeData);

    localStorage.setItem('serving', servingSize);
    localStorage.setItem('recipe', recipeData);

    this.props.router.navigate('recipe-calculator/', {trigger:true});
  },
  render: function(){
    return (
      <TemplateComponent>
        <ListComponent handleCalculator={this.handleCalculator}/>
      </TemplateComponent>
    )
  }
});

module.exports = {
  ListContainer: ListContainer
};
