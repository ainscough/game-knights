import React, { Component } from 'react';
import { Advertisement, Card, Grid } from 'semantic-ui-react';
import { Link } from 'react-router';
import autobind from 'class-autobind';
import { getAvatar }  from '../../utilities/utilityDB';

export default class UserOverview extends Component {
  constructor(){
    super();
    autobind(this);
  }
  
  componentWillMount(){
    const { userID } = this.props.params;
    this.props.viewUser(userID);

  }

  componentDidMount(){

  }

  render() {
    const { username, profile } = this.props.viewUserData;
    return (
      <Grid padded>
        <Grid.Column width={14}>
            <Card fluid>
              <Card.Content>
                <Card.Header>

                  {username}
                </Card.Header>
              </Card.Content>


            </Card>
        </Grid.Column>
        <Grid.Column width={2}>
          <Advertisement unit='wide skyscraper' test='Wide Skyscraper FC'/>
        </Grid.Column>
      </Grid>
    )
  }
}
