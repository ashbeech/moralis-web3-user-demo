import React from "react";
import ReactDOM from "react-dom";

import { MoralisProvider } from "react-moralis";
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// step 1
// create .env outside of src dir
const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;
// test server connected
console.log(APP_ID);
console.log(SERVER_URL);

ReactDOM.render(
  // step 2
  // insert Moralis provider components
  <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
    <MoralisDappProvider>
      <App />
    </MoralisDappProvider>
  </MoralisProvider>,
  document.getElementById("root")
);

// step 3
// Taken from boilerplate: https://github.com/ethereum-boilerplate/ethereum-boilerplate
// - ./DAO/Account.js
// - ./DAO/Blockie.jsx
// - ./DAO/Address/*
// - ./helpers/*
// - ./providers/*
// npm i dependancies used in boilerplate files
// - react-moralis

// step 4
// Use Account component to incorporate user account from crypto login across site
// - e.g. Connect.js and ContactForm.js

// step 5
// Incorporate Web3 functionality across site via further Moralis callbacks and saved user data inside server instance.

reportWebVitals();
