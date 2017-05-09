import { watchGetNews } from './containers/news/sagas';

export default function* rootSaga() {
  yield [
    watchGetNews()
  ]
}
