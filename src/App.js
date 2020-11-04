import React, { useEffect } from "react";

import "./App.css";

import Header from "./components/header/header";

import Homepage from "./pages/homepage/homepage";
import SuggestPage from "./pages/suggest/suggest";

import { Switch, Route } from "react-router-dom";

import {
  initializeDilemmas,
  getQuestion,
} from "./redux/question/question.actions";
import { useDispatch } from "react-redux";

import { readSuggestions } from "./firebase/firebase";

function App() {
  const dispatch = useDispatch();
  const dilemmas = readSuggestions();

  useEffect(() => {
    dilemmas.then(data => {
      dispatch(initializeDilemmas(data));
      dispatch(getQuestion());
    })
  }, [dispatch, dilemmas]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/suggest">
          <SuggestPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
