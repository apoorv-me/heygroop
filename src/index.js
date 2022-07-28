// scroll bar
import React from 'react';
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom/client';
import {BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

//
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {persistor,store} from './Redux/Store';

import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';


// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <BrowserRouter basename='adminpanel'>
   <HelmetProvider>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    
   </HelmetProvider>
  </BrowserRouter>,
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
