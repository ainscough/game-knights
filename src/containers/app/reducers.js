import { CREATE_USER_SUCCESS, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
         VIEW_USER, VIEW_USER_SUCCESS, VIEW_USER_FAILURE,
          LOGOUT_USER } from './constants';
import Immutable from 'immutable';

const initialState = Immutable.Map({
  currentUser : Immutable.Map(),
  viewUser : Immutable.Map(),
  isLoggedIn: false});

function appReducer(state = initialState, action){
  switch(action.type){
    case LOGIN_USER_SUCCESS:
      return state.merge({currentUser : Immutable.fromJS(action.currentUser),
                          isLoggedIn : true});
    case LOGIN_USER_FAILURE:
      return state;
    case LOGOUT_USER:
      return state.merge({currentUser : Immutable.Map(),
                          isLoggedIn : false})
    case VIEW_USER_SUCCESS:
      return state.merge({viewUser : Immutable.fromJS(action.profile)
      })
    case VIEW_USER_FAILURE:
      return state;
    default:
      return state;
  }
}

export default appReducer;
