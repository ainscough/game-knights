import React, { Component } from 'react';
import { Divider, Header, Image, Label, List, Menu, Popup } from 'semantic-ui-react';
import { Link } from 'react-router';
import autobind from 'class-autobind';
import db from '../../base';

export default class UserButton extends Component {
  constructor(){
    super();
    autobind(this);
  }

  componentDidMount(){

  }

  findAlertColor(count){
    if(count > 0){
      return 'teal';
    }
    return 'grey';
  }

  render() {
    const { username } = this.props.currentUser;
    const { avatar } = this.props.currentUser.profile;
    const { newMessagesCount , newActivityCount } = this.props.currentUser.stats;
    return (
      <Popup
        name = "authPop"
        on='hover'
        hoverable
        flowing
        trigger={<Menu.Item>
          <Image src={avatar}
                 size='mini'
                 spaced />
          <b>{username}</b>
        </Menu.Item> }
        position='bottom right'>
        <Header textAlign='center'><h2>{username}</h2></Header>
        <Image src={avatar}
               size='tiny'
               centered/>
        <Divider horizontal/>

        <List>
          <List.Item>
            <List.Content floated='left'>
              <Header
                as={Link} to="/">
                Dashboard
              </Header>
            </List.Content>
          </List.Item>
          <List.Item>

            <List.Item>
              <List.Content floated='left'>
                <Header
                  as={Link} to="/">
                  Inbox
                </Header>
              </List.Content>
              <List.Content floated='right'>
                <Label horizontal size='mini' color={this.findAlertColor(newMessagesCount)}>{newMessagesCount}</Label>
              </List.Content>
            </List.Item>

          </List.Item>
          <List.Item>
            <List.Content floated='left'>
              <Header
                as={Link} to="/">
                Activity
              </Header>
            </List.Content>
            <List.Content floated='right'>
              <Label horizontal size='mini' color={this.findAlertColor(newActivityCount)}>{newActivityCount}</Label>
            </List.Content>
          </List.Item>

          <List.Item>
            <List.Content floated='left'>
              <Header
                as={Link} to="/">
                Preferences
              </Header>
            </List.Content>
          </List.Item>
        </List>


         <Divider horizontal/>

        <a href="#"
          onClick={this.props.handleSignout}><h4>
            Sign Out
          </h4></a>

      </Popup>
    )
  }
}
