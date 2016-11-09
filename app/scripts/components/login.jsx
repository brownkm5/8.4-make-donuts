var React = require('react');
var $ = require('jquery');

var LoginForm = React.createClass({
  getInitialState: function(){
    var username = '';
    var password = '';
    return {
      username: username,
      password: password
    }
  },
  handleUsername:function(e){
    var username = e.target.value;
    this.setState({username});
  },
  handlePassword:function(e){
    var password = e.target.value;
    this.setState({password});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var userData = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.handleSubmit(userData);
  },
  render: function(){
    var self = this;
    return (
      <form onSubmit={self.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input onChange={self.handleUsername} type="username" className="form-control" id="username" placeholder="Username"/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input onChange={self.handlePassword} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    )
  }
});

var SignUpComponent = React.createClass({
  getInitialState: function(){
    var username = '';
    var password = '';

    return {
      username: username,
      password: password
    }
  },
  handleUsername: function(e){
    var username = e.target.value;
    this.setState({username: username});
    // console.log(userEmail);
  },
  handlePassword: function(e){
    var userPassword = e.target.value;
    this.setState({password: userPassword});
  },
  handleSignUp: function(e){
    e.preventDefault();

    var userData = {
      username: this.state.username,
      password: this.state.password
    };
    // console.log(userData);
    this.props.handleSignUp(userData);

  },
  render: function(){
    var self = this;
    return(
      <div >
        <h2>Need an Account? Sign Up!</h2>
        <form onSubmit={self.handleSignUp} id="signup">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input onChange={self.handleUsername} className="form-control" name="username" id="username" type="username" placeholder="Username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={self.handlePassword} className="form-control" name="password" id="password" type="password" placeholder="Password Please" />
          </div>
          <input className="btn btn-primary" type="submit" value="Sign Me Up!" />
        </form>

      </div>
    )
  }
});

var LoginContainer = React.createClass({
  componentWillMount: function(){
  this.ajaxSetup();
  },
  ajaxSetup: function(token){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader('X-Parse-Application-Id', 'kmbparse');
        xhr.setRequestHeader('X-Parse-REST-API-Key', 'kylesb');
        if(token){
          xhr.setRequestHeader('X-Parse-Session-Token', token);
        }
      }
    });
  },
  handleSignUp: function(userData){
    console.log(userData);
    $.post('https://kevinbrowntown.herokuapp.com/users', userData).then(function(response){
      console.log(response);
    });
  },
  handleSubmit: function(userInfo){
    var username = userInfo.username;
    var password = userInfo.password;
    // console.log(userInfo);
    var self = this;
    var url = 'https://kevinbrowntown.herokuapp.com/';

    $.ajax(url + 'login?username=' + username + '&password=' + password).then(function(response){
      localStorage.setItem('username', response.username);
      localStorage.setItem('token', response.sessionToken);
      console.log(response);
      if (response.sessionToken) {
        self.props.router.navigate('new-recipe/', {trigger: true});
      };
    });
  },
  render: function(){
    console.log(this.props.router);
    return (
      <div className='container'>
        <div className="col-sm-6">
          <div className="well">
            <LoginForm handleSubmit={this.handleSubmit}/>
            <SignUpComponent handleSignUp={this.handleSignUp}/>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = {
  LoginContainer: LoginContainer
};
