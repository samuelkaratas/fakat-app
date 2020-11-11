import React, { useEffect } from "react";

import "./App.css";

import Header from "./components/header/header";

import Homepage from "./pages/homepage/homepage";
import SuggestPage from "./pages/suggest/suggest";

import { Switch, Route, Redirect } from "react-router-dom";

import {
  initializeDilemmas,
  getQuestion,
} from "./redux/question/question.actions";
import { useDispatch } from "react-redux";

import {
  readSuggestions,
  auth,
  createUserProfileDocument,
} from "./firebase/firebase";

import SignInAndSignUpPage from "pages/signin-signup/signin-signup";

import { setCurrentUser } from "./redux/user/user.actions";

import { useSelector } from "react-redux";

import { selectCurrentUser } from "redux/user/user.selectors";

function App() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const dilemmas = readSuggestions();

  useEffect(() => {
    dilemmas.then((data) => {
      dispatch(initializeDilemmas(data));
      dispatch(getQuestion());
    });
  }, [dispatch, dilemmas]);

  useEffect(() => {
    let unsubscribeFromAuth = null;

    const getUser = async () => {
      unsubscribeFromAuth = await auth.onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot((snapShot) => {
            dispatch(
              setCurrentUser({
                id: snapShot.id,
                ...snapShot.data(),
              })
            );
          });
        }

        dispatch(setCurrentUser(userAuth));
      });
    };

    getUser();

    return function cleanup() {
      unsubscribeFromAuth();
    };
  }, [dispatch]);

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
        <Route
          exact
          path="/signin-signup"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
      </Switch>
    </div>
  );
}

export default App;
