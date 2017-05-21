import { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
         CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAILURE,
        LOGOUT_USER, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAILURE,
        VIEW_USER, VIEW_USER_SUCCESS, VIEW_USER_FAILURE} from './constants';

export function loginUser(userKey){
  return{
    type: LOGIN_USER,
    userKey
  }
}

export function loginUserSuccess(currentUser){
  return {
    type: LOGIN_USER_SUCCESS,
    currentUser
  };
}

export function loginUserFailure(){
  return{
    type: LOGIN_USER_FAILURE,
  }
}

export function createUser(profile){
  return{
    type: CREATE_USER,
    profile
  }
}

export function createUserSuccess(profile){
  return {
    type: CREATE_USER_SUCCESS,
    profile
  };
}

export function createUserFailure(){
  return{
    type: CREATE_USER_FAILURE,
  }
}


export function logoutUser(){
  return{
    type: LOGOUT_USER,
  }
}

export function logoutUserSuccess(){
  return{
    type: LOGOUT_USER_SUCCESS,
  }
}

export function logoutUserFailure(){
  return{
    type: LOGOUT_USER_FAILURE,
  }
}

export function viewUser(username){
  return{
    type: VIEW_USER,
    username
  }
}

export function viewUserSuccess(profile){
  return {
    type: VIEW_USER_SUCCESS,
    profile
  };
}

export function viewUserFailure(){
  return{
    type: VIEW_USER_FAILURE,
  }
}
