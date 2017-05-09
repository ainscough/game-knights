import { GET_NEWS_SUCCESS, GET_NEWS_FAILURE } from './constants';
import Immutable from 'immutable';

const initialState = Immutable.Map();

function newsReducer(state = initialState, action){
  switch(action.type){
    case GET_NEWS_SUCCESS:
      return state.merge({articles : Immutable.fromJS(action.articles)});
    case GET_NEWS_FAILURE:
      console.log("Get News - Failure");
      return state;
    default:
      return state;
  }
}

export default newsReducer;
