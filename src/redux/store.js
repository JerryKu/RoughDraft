import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import reducer from './reducer';
import thunk from 'redux-thunk';

import createHistory from 'history/createBrowserHistory';

//build middleware for intercepting and dispatch navigation actions
//const myRouterMiddleware = routerMiddleware(history)
export const history = createHistory();

export const store = createStore(
  reducer, composeWithDevTools(applyMiddleware(thunk)));
