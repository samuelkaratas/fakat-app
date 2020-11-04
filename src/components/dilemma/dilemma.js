import React from "react";

import "./dilemma.css";
import Spinner from "react-bootstrap/Spinner";

import { useSelector } from "react-redux";

import { selectChosenQuestion } from "../../redux/question/question.selectors";

const Dilemma = () => {
  const chosenQuestion = useSelector(selectChosenQuestion);
  //const { firstOption, secondOption } = chosenQuestion;
  const firstOption = chosenQuestion
    ? chosenQuestion.firstOption
    : "Woooww... Dilemalar bitti";
  const secondOption = chosenQuestion
    ? chosenQuestion.secondOption
    : "Öneri kısmından dilemalarınızı gönderebilirsiniz";
  //console.log(chosenQuestion);
  return firstOption ? (
    <div className="dilemma-container">
      <h2 className="first">{firstOption}</h2>
      <br />
      <h1 className="fakat">FAKAT</h1>
      <br />
      <h2 className="second">{secondOption}</h2>
    </div>
  ) : (
    <div className="dilemma-container">
      <Spinner animation="grow" role="status" variant="light">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Dilemma;
