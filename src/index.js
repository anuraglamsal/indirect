import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyB9gd1Y0dXbhY2LZbW4QPvZDcRFrMdx49Q",
  authDomain: "garuda-e93e5.firebaseapp.com",
  projectId: "garuda-e93e5",
  storageBucket: "garuda-e93e5.appspot.com",
  messagingSenderId: "1029636925054",
  appId: "1:1029636925054:web:5969b6b1df0d04f9651a2f",
  measurementId: "G-BZSS2XN4LT"
};

const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
