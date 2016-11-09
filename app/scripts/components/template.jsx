var React = require('react');


var TemplateComponent = React.createClass({
  render: function(){
    return(
      <div className='contain'>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
            <li></li><a className="navbar-brand" href="#recipe-list/">My Recipes</a><li></li>
             <li className="recipe-form"><a href="#new-recipe/">New Recipe</a></li>
             <li><a href="#recipe-calculator/">Recipe Calculator</a></li>
            </ul>
          </div>
          </nav>


      <div className="container">  {this.props.children}</div>


      </div>
    )
  }
});

module.exports = TemplateComponent;
