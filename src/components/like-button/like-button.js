import React, { useEffect } from "react";

import Button from "react-bootstrap/Button";

import { Heart } from "react-feather";

import { toggleLike } from "../../redux/question/question.actions";
import { updateLike } from "../../firebase/firebase";

import {
  selectLiked,
  selectChosenQuestion,
} from "../../redux/question/question.selectors";

import { useSelector, useDispatch } from "react-redux";

const LikeButton = () => {
  const dispatch = useDispatch();
  const chosenQuestion = useSelector(selectChosenQuestion);
  const { id } = chosenQuestion ? chosenQuestion : "";
  const liked = useSelector(selectLiked)

  const handleClick = () => {
    dispatch(toggleLike());
  };

  useEffect(() => {
    if (liked) {
      console.log("true state", liked);
      updateLike(id, 1)
    } else if (liked === undefined) {
      console.log("undefined state", liked);
    } else {
      console.log("false state", liked);
      updateLike(id, 0)
    }
  }, [liked, id]);

  return (
    <div>
      <Button variant="outline-secondary" onClick={handleClick}>
        <Heart
          color={liked ? "tomato" : "white"}
          fill={liked ? "tomato" : "transparent"}
        />
      </Button>
    </div>
  );
};

export default LikeButton;
