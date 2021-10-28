import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import './index.css';
import App from './App';
import rootReducer from './reducers/index'
import "react-toastify/dist/ReactToastify.css";
import 'antd/dist/antd.css'

//store
let store = createStore(rootReducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
     <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

