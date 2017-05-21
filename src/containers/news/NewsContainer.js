import React, { Component } from 'react';
import { Advertisement, Card, Grid } from 'semantic-ui-react';
import Immutable from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as newsActionCreators from './actions';
import autobind from 'class-autobind';
import NewsEntry from '../../components/newsEntry/NewsEntry';


class NewsContainer extends Component {
  constructor(){
    super();
    autobind(this);
  }

  componentDidMount(){
    this.props.getNews();
  }

  componentWillUnmount(){

  }

  render(){
    return(

      <Grid padded>
        <Grid.Column width={14}>
            <Card.Group>
              {this.props.articles.map((article, i) => <NewsEntry info={article} key={i} i={i}/>)}
            </Card.Group>
        </Grid.Column>
        <Grid.Column width={2}>
          <Advertisement unit='wide skyscraper' test='Wide Skyscraper FC'/>
        </Grid.Column>
      </Grid>

    )
  }
}


// We can read values from the state thanks to mapStateToProps
function mapStateToProps (state) {
  return {
    articles : state.getIn(['news','articles'], Immutable.List()).toJS()
  }
}
// We can dispatch actions to the reducer and sagas
function mapDispatchToProps (dispatch) {
  return bindActionCreators(newsActionCreators, dispatch);
}
// Finally we export the connected GamesContainer
export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);
