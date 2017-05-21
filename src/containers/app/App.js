import React, { Component } from 'react';
import { Button, Divider, Icon, Input, Form, Grid, Menu, Message, Popup, Rail } from 'semantic-ui-react';
import { Link } from 'react-router';
import Immutable from 'immutable';
import { bindActionCreators } from 'redux';
import autobind from 'class-autobind';
import { connect } from 'react-redux';
import db from '../../base';
import * as appActionCreators from './actions';
import UserButton from '../../components/userButton/UserButton';
import './App.css';

class App extends Component {
  constructor(){
    super();
    autobind(this);
  }

  componentDidMount () {
    db.onAuth(this.authDataCallback);
  }

  state = {email: '', password: '',
          isError:false, errHeader:'', errMessage:'',
          isOpen:false}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value,
                    isError: false })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { email, password } = this.state
    db.authWithPassword({email, password}, this.authHandler);
  }

  authHandler(error, user){
    if(error){
      console.log("error:", error.code);
      switch(error.code){
        case "auth/user-not-found":
          this.setState({errHeader:"",
                         errMessage:"Bad Username/Password",
                         isError:true})
          break;
        default:
          this.setState({errHeader:error.code,
                         errMessage:error.message,
                         isError:true})
      }

    }
  }

  authDataCallback(user) {
    if (user) {
      this.props.loginUser(user.uid);
      console.log("Logged in to FB with ID:", user.uid)
    }
    else{
      console.log("Logged out of FB");
    }
  }


  handleSignout(){
    db.unauth();
    this.props.logoutUser();
    console.log("signing out")
  }
  handleOpen(){
    this.setState({isOpen: true})
  }
  handleClose(){
    this.setState({isOpen: false})
  }
  handleSignUpClick(){
    console.log("signing up")
    this.setState({isOpen: false})
  }

  render() {
    const { activeItem, isError, errHeader, errMessage, isOpen } = this.state
    const { isLoggedIn, currentUser } = this.props
    return (

      <div>
      <Menu>
        <Menu.Item
          name='home'
          as={Link} to='/'
          active={activeItem==='home'}
          onClick={this.handleItemClick}>
          <Icon name="shield"/>
          <b>Game Knights</b>
        </Menu.Item>
        <Menu.Item
          name='news'
          as={Link} to='/news'
          active={activeItem==='news'}
          onClick={this.handleItemClick}>
          News
        </Menu.Item>
        <Menu.Item
          name='games'
          as={Link} to='/games'
          active={activeItem==='games'}
          onClick={this.handleItemClick}>
          Games
        </Menu.Item>
        <Menu.Item
          name='discussions'
          as={Link} to='/discussions'
          active={activeItem==='discussions'}
          onClick={this.handleItemClick}>
          Discussions
        </Menu.Item>
        <Menu.Item
          name='tools'

          active={activeItem==='tools'}
          onClick={this.handleItemClick}>
          Tools
        </Menu.Item>
        <Menu.Menu
          position="right">
          <Menu.Item>
            <Input className='icon' icon='search' placeholder='Search...' />
          </Menu.Item>
          {isLoggedIn ? <UserButton currentUser={this.props.currentUser} handleSignout={this.handleSignout}/>  :
          <Popup
            name = "authPop"
            on ='click'
            open={isOpen}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            trigger={<Menu.Item name='auth' active={activeItem==='authPop'}>
             Log In / Sign Up
            </Menu.Item> }
            position='bottom right'>
              <Form error={isError} onSubmit={this.handleSubmit}>
                <Form.Input required name='email' label='E-mail Address' placeholder='E-mail Address' onChange={this.handleChange}/>
                <Form.Input required name='password' label='Password' placeholder='Password' onChange={this.handleChange}/>
                <Button fluid type='submit'>Log In</Button>
                <Message error compact>
                  <p>{errMessage}</p>
                </Message>
              </Form>
               <Divider horizontal>Or</Divider>
              <Button
                as={Link} to='/auth'
                fluid
                color = "blue"
                onClick={this.handleSignUpClick}>Sign Up!</Button>

          </Popup>
          }
          <Menu.Item
            name='help'
            as={Link} to='/help'
            active={activeItem==='help'}>
             Help
           </Menu.Item>
         </Menu.Menu>
      </Menu>
      {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
}

// We can read values from the state thanks to mapStateToProps
function mapStateToProps (state) {
  return { // We get all the games to list in the page
    isLoggedIn : state.getIn(['app', 'isLoggedIn'], Immutable.List()),
    currentUser : state.getIn(['app', 'currentUser'], Immutable.List()).toJS(),
    viewUserData : state.getIn(['app', 'viewUser'], Immutable.List()).toJS()
  }
}
function mapDispatchToProps (dispatch) {
  return bindActionCreators(appActionCreators, dispatch);
}
// Finally we export the connected GamesContainer
export default connect(mapStateToProps, mapDispatchToProps)(App);
