import React from "react";

import "./next-button.css";

import { ArrowRight } from "react-feather";

import Button from "react-bootstrap/Button";

import { useDispatch } from "react-redux";
import {
  getQuestion,
  toggleOptions,
  addDilemaToShown,
  getComments,
} from "../../redux/question/question.actions";

//import { readSuggestions } from "../../firebase/firebase";

const NextButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addDilemaToShown());
    dispatch(toggleOptions());
    dispatch(getQuestion());
    dispatch(getComments([]))
    //readSuggestions();
  };

  return (
    <div className="next-button-container">
      <Button className="button" variant="outline-light" onClick={handleClick}>
        <ArrowRight />
      </Button>
    </div>
  );
};

export default NextButton;
