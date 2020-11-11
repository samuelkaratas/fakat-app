import React from "react";

import "./options.css";

import { Check, X } from "react-feather";
import Button from "react-bootstrap/Button";

import { updateRatio, getCommentsFromDatabase } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";

import {
  toggleOptions,
  getComments,
} from "../../redux/question/question.actions";

import { selectChosenQuestion } from "../../redux/question/question.selectors";

const Options = () => {
  const dispatch = useDispatch();
  const chosenQuestion = useSelector(selectChosenQuestion);
  const { id } = chosenQuestion ? chosenQuestion : "";

  const yesClickHandler = () => {
    dispatch(toggleOptions());
    updateRatio(id, 1);
    const comments = getCommentsFromDatabase(id);
    comments.then((data) => {
      dispatch(getComments(data));
    });
  };

  const noClickHandler = () => {
    dispatch(toggleOptions());
    updateRatio(id, 0);
    const comments = getCommentsFromDatabase(id);
    comments.then((data) => {
      dispatch(getComments(data));
    });
  };

  if (chosenQuestion) {
    return (
      <div className="options-container">
        <Button
          className="button"
          variant="outline-success"
          onClick={yesClickHandler}
        >
          <Check />
        </Button>
        <Button
          className="button"
          variant="outline-danger"
          onClick={noClickHandler}
        >
          <X />
        </Button>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Options;
