import './options.scss';
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Helper from '../helpers/chrome-helper';

import Options from '../components/options/options';

import './main.scss'
const init = () => {
    ReactDOM.render(
        <Options/>
        ,
        document.getElementById('root'));
};

// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
}

init();

