import React, { Component } from 'react';
import { Menu, Icon, Input } from 'semantic-ui-react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
  state = {}
  
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
      <Menu>
        <Menu.Item
          name='home'
          as={Link} to='/'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}>
          <Icon name="shield"/>
        </Menu.Item>
        <Menu.Item
          name='news'
          as={Link} to='/news'
          active={activeItem === 'news'}
          onClick={this.handleItemClick}>
          News
        </Menu.Item>
        <Menu.Item
          name='games'
          as={Link} to='/games'
          active={activeItem === 'games'}
          onClick={this.handleItemClick}>
          Games
        </Menu.Item>
        <Menu.Item
          name='discussions'
          as={Link} to='/discussions'
          active={activeItem === 'discussions'}
          onClick={this.handleItemClick}>
          Discussions
        </Menu.Item>
        <Menu.Item
          name='tools'
          as={Link} to='/tools'
          active={activeItem === 'tools'}
          onClick={this.handleItemClick}>
          Tools
        </Menu.Item>
        <Menu.Menu
          position="right">
          <Menu.Item>
            <Input className='icon' icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item name='signup' active={activeItem === 'signup'} onClick={this.handleItemClick}>
             Sign Up
           </Menu.Item>
           <Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick}>
              Log In
            </Menu.Item>
          <Menu.Item name='help' active={activeItem === 'help'} onClick={this.handleItemClick}>
             Help
           </Menu.Item>
         </Menu.Menu>
      </Menu>

      {this.props.children}
      </div>
    )
  }
}

// We can read values from the state thanks to mapStateToProps
function mapStateToProps (state) {
  return { // We get all the games to list in the page
    state
  }
}

// Finally we export the connected GamesContainer
export default connect(mapStateToProps)(App);
