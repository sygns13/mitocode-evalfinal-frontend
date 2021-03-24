import React from 'react';
import ReactDOM from 'react-dom';
//import { Provider } from 'react-redux';
import MainRouter from './router'
import history from './utils/history';
//import configureStore from './redux/store';
import PrimeReact from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


import App from './App';

PrimeReact.ripple = true;

const initialState = {}
//const store = configureStore(initialState, history)
const store = "hola";

ReactDOM.render(
  <React.StrictMode>

      <MainRouter />

  </React.StrictMode>,
  document.getElementById('root')
);