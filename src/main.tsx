import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './redax/store.tsx';



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
