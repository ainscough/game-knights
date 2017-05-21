import { watchGetNews } from './containers/news/sagas';
import { watchLoginUser, watchCreateUser, watchViewUser } from './containers/app/sagas';
import { all } from 'redux-saga/effects';
export default function* rootSaga() {
  yield all([
    watchGetNews(),
    watchLoginUser(),
    watchCreateUser(),
    watchViewUser()
  ])
}
