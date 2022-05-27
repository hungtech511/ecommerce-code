import React from 'react';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import store from './redux/store';
import { Provider } from 'react-redux'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SkeletonTheme baseColor="#e2e5e7" highlightColor="#fff">
        <  BrowserRouter basename={process.env.PUBLIC_URL}>
          <ScrollToTop></ScrollToTop>
          <App />
        </  BrowserRouter>
      </SkeletonTheme>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
