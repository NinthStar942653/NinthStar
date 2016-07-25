/*
 * System: PageRouter
 * Create: 2016-07-15
 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import Normalize from 'normalize.css';

import {MainPage} from './pages/MainPage';
import {NotFoundPage} from './pages/NotFoundPage';

const PageRouter = (
    <Router history={browserHistory}>
        <Route path="/" component={MainPage} />
        <Route path="*" component={NotFoundPage} />
    </Router>
);

// React Start!
ReactDOM.render(PageRouter, document.getElementById('react-root'));
