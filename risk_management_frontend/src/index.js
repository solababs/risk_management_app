import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

import './styles/index.css'
import App from './containers/App'
import Store from './store';


ReactDOM.render(
    <Provider store={Store}>
        <Router>
            <Route component={App} />
        </Router>
    </Provider>,
    document.getElementById('root'));

