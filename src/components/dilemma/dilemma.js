import React from "react";

import "./dilemma.css";
import Spinner from "react-bootstrap/Spinner";

//import { selectCurrentUserId } from '../../redux/user/user.selectors';

import LikeButton from "components/like-button/like-button";

const Dilemma = ({ home, id, liked, chosenQuestion, showOptions }) => {
  
  const firstOption = chosenQuestion
    ? chosenQuestion.firstOption
    : "Woooww... Fakatlar bitti";
  const secondOption = chosenQuestion
    ? chosenQuestion.secondOption
    : "Aklınıza gelen ikilemleri fakat gönder sayfasından gönderebilirsiniz";

  return firstOption ? (
    <div className="dilemma-container">
      <div className="fakat-container">
        <p className="first">{firstOption}</p>
        <br />
        <p className="fakat">FAKAT</p>
        <br />
        <p className="second">{secondOption}</p>
      </div>
      {home ? (
        !showOptions ? (
          <div className="like-button">
            <LikeButton home={home} liked={liked} id={id} />
          </div>
        ) : (
          <div></div>
        )
      ) : (
        <div className="like-button">
            <LikeButton home={home} liked={liked} id={id} />
          </div>
      )}
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
