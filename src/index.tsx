import React from 'react';
import { ToastContainer } from "react-toastify";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <Router>
      <ToastContainer autoClose={5000} />
      <App />
    </Router>
  </Provider>
);
