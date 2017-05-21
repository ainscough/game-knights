import React, { Component } from 'react';
import { Advertisement, Card, Grid } from 'semantic-ui-react';
import Immutable from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as newsActionCreators from './actions';
import autobind from 'class-autobind';
import NewsEntry from '../../components/newsEntry/NewsEntry';

class FeedContainer extends Component {
  constructor(){
    super();
    autobind(this);
  }

  render(){
    return(
      <Grid padded>
        <Grid.Column width={14}>
              <Card.Group itemsPerRow="1">
                <Card>
                  Test
                </Card>
                <Card>
                  Test
                </Card>
                <Card>
                  Test
                </Card>
              </Card.Group>
        </Grid.Column>
        <Grid.Column width={2}>
          <Advertisement unit='wide skyscraper' test='Wide Skyscraper FC'/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default FeedContainer;
