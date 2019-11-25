import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Helper from '../helpers/chrome-helper';

import PopUp from '../components/pop-up/pop-up';

import './main.scss'
const init = (credentials) => {
    ReactDOM.render(
    <PopUp credentials={credentials}/>
        ,
        document.getElementById('root'));
};



// Hot Module Replacement
if (module.hot) {
    module.hot.accept();
}
Helper.getSync(['credentials']).then(data => {

    init(data.credentials);
});
