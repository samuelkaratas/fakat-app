import React, { useEffect } from "react";

import "./App.css";

import Header from "./components/header/header";

import Homepage from "./pages/homepage/homepage";
import SuggestPage from "./pages/suggest/suggest";
import FavoritesPage from "pages/favorites/favorites";

import { Switch, Route, Redirect } from "react-router-dom";

import {
  initializeDilemmas,
  getQuestion,
} from "./redux/question/question.actions";
import { useDispatch, useSelector } from "react-redux";

import {
  readSuggestions,
  auth,
  createUserProfileDocument,
} from "./firebase/firebase";

import SignInAndSignUpPage from "pages/signin-signup/signin-signup";

import { setCurrentUser, setCurrentUserId } from "./redux/user/user.actions";

import { selectCurrentUserId } from "redux/user/user.selectors";
import FavoritesDetailPage from "pages/favorites-detail/favorites-detail";

function App() {
  const currentUserId = useSelector(selectCurrentUserId);
  const dispatch = useDispatch();
  const dilemmas = readSuggestions(currentUserId);

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
            dispatch(setCurrentUserId(snapShot.id));
          });
        }
        dispatch(setCurrentUserId(null));
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
            currentUserId ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        />
        <Route exact path="/favorites">
          <FavoritesPage />
        </Route>
        <Route path="/favorites/:id">
          <FavoritesDetailPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
