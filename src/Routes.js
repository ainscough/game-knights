import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux'
import App from './containers/app/App';
import Home from './components/home/Home';
import NewsContainer from './containers/news/NewsContainer';
import GamesContainer from './containers/games/GamesContainer';
import Missing from './components/missing/Missing';

import {store, history} from './redux-router-init.js'

const Routes = () =>{
  return(
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/news" component={NewsContainer}/>
            <Route path="/games" component={GamesContainer}/>
            <Route path="*" component={Missing} />
        </Route>
      </Router>
    </Provider>
  )
}



export default Routes;
