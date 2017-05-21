import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';

/* Internal dependencies */
import appReducer from './containers/app/reducers';
import newsReducer from './containers/news/reducers';
import routerReducer from './router-reducer'

const rootReducer = combineReducers({
    app: appReducer,
    news: newsReducer,
    routing: routerReducer
})
const initialState = Immutable.Map();

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer,
                            initialState,
                            applyMiddleware(sagaMiddleware,
                                            routerMiddleware(browserHistory)),
                            window.devToolsExtension && window.devToolsExtension());
  sagaMiddleware.run(rootSaga);
  return store;
};

const store = configureStore();

/* Create enhanced history object for router */
const createSelectLocationState = () => {
  let prevRoutingState, prevRoutingStateJS;
  return (state) => {
    const routingState = state.get('routing'); // or state.routing
    if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }
    return prevRoutingStateJS;
  };
};

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: createSelectLocationState()
});


export { store, history }
