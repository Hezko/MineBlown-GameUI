import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './app';

ReactDOM.render(
    <BrowserRouter >
        <App />
    </BrowserRouter>,
    document.getElementById('mount')
);
