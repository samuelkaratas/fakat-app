import React from "react";

import "./favourite.css";

import Card from "react-bootstrap/Card";

import Ratio from "components/ratio/ratio";

import { useHistory } from "react-router-dom";

import { useDispatch } from "react-redux";

import { resetFavLike } from "../../redux/question/question.actions";

const Favourite = ({ data }) => {
  const dispatch = useDispatch();
  let history = useHistory();

  const handleClick = () => {
    //console.log(data.id);
    history.push(`favorites/${data.id}`);
    dispatch(resetFavLike());
  };

  return (
    <div className="favourite-container" onClick={handleClick}>
      <Card bg="secondary" text="white">
        <Card.Body>
          <Card.Title>{data.firstOption}</Card.Title>
          <Card.Title>FAKAT</Card.Title>
          <Card.Title>{data.secondOption}</Card.Title>
          <Ratio chosenQuestion={data} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Favourite;
