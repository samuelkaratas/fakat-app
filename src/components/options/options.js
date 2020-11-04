import React from "react";

import "./options.css";

import { Check, X } from "react-feather";
import Button from "react-bootstrap/Button";

import { updateRatio } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";

import { toggleOptions } from "../../redux/question/question.actions";

import { selectChosenQuestion } from "../../redux/question/question.selectors";

const Options = () => {
  const dispatch = useDispatch();
  const chosenQuestion = useSelector(selectChosenQuestion);
  const {id, yesCount, noCount, firstOption, secondOption} = chosenQuestion ? chosenQuestion : '';

  const yesClickHandler = () => {
    dispatch(toggleOptions());
    updateRatio(id, yesCount+1, noCount, firstOption, secondOption)
  };

  const noClickHandler = () => {
    dispatch(toggleOptions());
    updateRatio(id, yesCount, noCount+1, firstOption, secondOption)
  };

  if(chosenQuestion) {
    return (
      <div className="options-container">
        <Button variant="outline-success" onClick={yesClickHandler}>
          <Check />
        </Button>
        <Button variant="outline-danger" onClick={noClickHandler}>
          <X />
        </Button>
      </div>
    );
  }else {
    return (<div></div>)
  }
  
};

export default Options;
