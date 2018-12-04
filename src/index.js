import React from 'react';
import ReactDOM from 'react-dom';
import './assets/medium.css';
import { Provider } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from './App.js';
import registerServiceWorker from './serviceWorker';

import { store, history } from './redux/store';

import { getUser } from './redux/actions/actions'

if(localStorage.AUTH) {
    console.log('first dispatch')
    //console.log(localStorage.Auth)
    // update localstorage
    store.dispatch({type: 'SET_USER', user: JSON.parse(localStorage.AUTH)})
}

ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
