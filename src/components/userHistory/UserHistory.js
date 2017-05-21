import React, { Component } from 'react';
import { Button, Divider, Menu, Popup } from 'semantic-ui-react';
import { Link } from 'react-router';
import autobind from 'class-autobind';

export default class UserHistory extends Component {
  constructor(){
    super();
    autobind(this);
  }

  render() {
    return (
      <h2>User History</h2>
    )
  }
}
