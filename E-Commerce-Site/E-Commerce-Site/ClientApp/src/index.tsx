import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// @ts-ignore
import App from './App';
// @ts-ignore
import reportWebVitals from './reportWebVitals';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

library.add(fasHeart, farHeart);

// Ensure baseUrl is a string or undefined
const baseUrl = document.getElementsByTagName('base')[0]?.getAttribute('href') || '/';
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <App/>
    </BrowserRouter>,
rootElement
);

reportWebVitals();
