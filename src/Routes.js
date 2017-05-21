import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux'

import App from './containers/app/App';
import NewsContainer from './containers/news/NewsContainer';
import GamesContainer from './containers/games/GamesContainer';


import Home from './components/home/Home';

import Auth from './components/auth/Auth';
import UserOverview from './components/userOverview/UserOverview';
import Help from './components/help/Help';
import HelpIndex from './components/help/HelpIndex';
import Privacy from './components/help/Privacy';
import Terms from './components/help/Terms';
import Content from './components/help/Content';
import AboutUs from './components/help/AboutUs';
import FAQ from './components/help/FAQ';
import Guide from './components/help/Guide';
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
          <Route path="/auth" component={Auth}/>
          <Route path="/user/:userID" component={UserOverview}>
            <IndexRoute component={HelpIndex}/>
          </Route>
          <Route path="/help" component={Help}>
            <IndexRoute component={HelpIndex}/>
            <Route path="/help/terms" component={Terms}/>
            <Route path="/help/privacy" component={Privacy}/>
            <Route path="/help/content" component={Content}/>
            <Route path="/help/faq" component={FAQ}/>
            <Route path="/help/guide" component={Guide}/>
            <Route path="/help/aboutUs" component={AboutUs}/>
          </Route>
          <Route path="*" component={Missing} />
        </Route>
      </Router>
    </Provider>
  )
}



export default Routes;
