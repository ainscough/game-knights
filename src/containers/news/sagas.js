import { call, put, takeLatest } from 'redux-saga/effects';
import { getNewsSuccess, getNewsFailure } from './actions';
import Firebase from 'firebase';
import db from '../../base';
import { GET_NEWS } from './constants';

const fetchNews = () => {
  const ctx = {};
  return db.fetch('news/articles', {
      context: ctx,
      asArray: true,
      then(data){
      }
    });
}

function* getNews () {
  try {
    const articles = yield call(fetchNews);
    yield put(getNewsSuccess(articles));
  } catch (err) {
    yield put(getNewsFailure());
  }
}

function* watchGetNews() {
  yield takeLatest(GET_NEWS, getNews);
}

export {
  watchGetNews
}
