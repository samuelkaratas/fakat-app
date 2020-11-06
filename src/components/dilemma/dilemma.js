import React from "react";

import "./dilemma.css";
import Spinner from "react-bootstrap/Spinner";

import { useSelector } from "react-redux";

import { selectChosenQuestion } from "../../redux/question/question.selectors";
import LikeButton from "components/like-button/like-button";

const Dilemma = () => {
  const chosenQuestion = useSelector(selectChosenQuestion);
  //const { firstOption, secondOption } = chosenQuestion;
  const firstOption = chosenQuestion
    ? chosenQuestion.firstOption
    : "Woooww... Dilemmalar bitti";
  const secondOption = chosenQuestion
    ? chosenQuestion.secondOption
    : "Öneri kısmından dilemmalarınızı gönderebilirsiniz";
  //console.log(chosenQuestion);
  return firstOption ? (
    <div className="dilemma-container">
      <div className='fakat-container'>
        <p className="first">{firstOption}</p>
        <br />
        <p className="fakat">FAKAT</p>
        <br />
        <p className="second">{secondOption}</p>
      </div>
      <div className="like-button">
        <LikeButton />
      </div>
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
