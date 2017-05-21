import { call, put, takeLatest } from 'redux-saga/effects';
import { loginUser, loginUserSuccess, loginUserFailure,
         createUserSuccess, createUserFailure,
         viewUser, viewUserSuccess, viewUserFailure} from './actions';
import db from '../../base';
import { LOGIN_USER, CREATE_USER, VIEW_USER } from './constants';
import { getAvatarLocation } from '../../utilities/utilityDB';

const fetchUserInfo = (userKey) => {
  const ctx = {};
  if (userKey == db.auth().currentUser.uid)
  {
    return db.fetch(`users/${userKey}`, {
        context: ctx,
        asArray: false})
        .then(data => {
          return db.fetch(`profiles/${data.username}`, {
              context: ctx,
              asArray: false
            }).then(profileData => {
              return db.fetch(`stats/${data.username}`, {
                  context: ctx,
                  asArray: false
                }).then(statsData => {
                  const currentUser ={
                    username: data.username,
                    profile: profileData,
                    stats: statsData
                  }
                  return currentUser;
                })
            })
        })

  }
}
function* loginUserSaga (actionData) {
  try {
    const userInfo = yield call(fetchUserInfo, actionData.userKey);
    yield put(loginUserSuccess(userInfo));
  } catch (err) {
    yield put(loginUserFailure());
  }
}

function* watchLoginUser() {
  yield takeLatest(LOGIN_USER, loginUserSaga);
}

const viewUserProfile = (username) =>{
  const ctx = {};
  return db.fetch(`profiles/${username}`, {
    context: ctx,
    asArray: false})
    .then(data => {

      const viewUser = {
        username,
        profile: data
      }
      console.log(viewUser);
      return viewUser;
    })
}

function* viewUserSaga (actionData) {
  try {
    const userInfo = yield call(viewUserProfile, actionData.username);
    yield put(viewUserSuccess(userInfo));
  } catch (err) {
    yield put(viewUserFailure());
  }
}

function* watchViewUser() {
  yield takeLatest(VIEW_USER, viewUserSaga);
}



const createUserDB = (actionData) => {
  const { username, email, userKey } = actionData.profile;
  const message = {
    header: "Welcome to Game Knights",
    body: "For more information...",
    senderID: "CoWp3zVNX8e4TJ24yGgpLDwAGRy1",
    timeSent: Date.now()
  }
  const sentMessage = db.push(`messages/${userKey}`, {
    data: { header: message.header,
            body: message.body,
            senderID: message.senderID,
            timeSent: message.timeSent }
  });
  const messageKey = sentMessage.key;

  const newUser = db.post(`users/${userKey}`, {
    data: { username,
            email
          },
      then(err){

      }
    });

  const newProfile = db.post(`profiles/${username}`, {
    data: { dateCreated : Date.now(),
            lastLogin : Date.now(),
            avatar : "default"
          },
      then(err){

      }
    });

    const newStats = db.post(`stats/${username}`, {
      data: { mightLevel: 1,
              mightXP: 0,
              wisdomLevel: 1,
              wisdomXP: 0,
              charismaLevel: 1,
              charismaXP: 0
            },
        then(err){

        }
      });
  return userKey;
}

function* createUser (actionData) {
  try {
    const username = yield call(createUserDB, actionData);
    yield put(loginUser(username));
  } catch (err) {
    yield put(createUserFailure());
  }
}

function* watchCreateUser() {
  yield takeLatest(CREATE_USER, createUser);
}

export {
  watchLoginUser,
  watchCreateUser,
  watchViewUser
}
