import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import './index.css';
import './App.css';
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.css'
import testApp from './reducers';

let store = createStore(testApp);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
  document.getElementById('root')
);
