import React, { Component } from 'react';
import Immutable from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as gamesActionCreators from './actions';

class GamesContainer extends Component {
  render(){
    return(
      <div>
        Games Here
      </div>
    )
  }
}

// We can read values from the state thanks to mapStateToProps
function mapStateToProps (state) {
  return { // We get all the games to list in the page
    games: state.getIn(['games', 'list'], Immutable.List()).toJS()
  }
}
// We can dispatch actions to the reducer and sagas
function mapDispatchToProps (dispatch) {
  return {
    gamesActions: bindActionCreators(gamesActionCreators, dispatch)
  };
}
// Finally we export the connected GamesContainer
export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer);
