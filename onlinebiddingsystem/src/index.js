import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // or bootstrap.min.jss

import  Home  from './pages/landing/Home.jsx';
import Auction from './pages/landing/Auction.jsx';
import Step from './pages/landing/Step.jsx';
import Contact from './pages/landing/Contact.jsx';
import Works from './pages/landing/Works.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
    <Auction />
    <Works />
    <Step />
    <Contact />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
