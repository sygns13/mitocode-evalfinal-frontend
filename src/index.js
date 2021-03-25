import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MainRouter from './router'
import history from './utils/history';
import configureStore from './redux/store';
import PrimeReact from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './style.css'


//import App from './App';

PrimeReact.ripple = true;

const initialState = {}
const store = configureStore(initialState, history)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);