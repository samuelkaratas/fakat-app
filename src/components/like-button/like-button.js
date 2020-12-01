import React, { useEffect } from "react";

import Button from "react-bootstrap/Button";

import { Heart } from "react-feather";

import { toggleLike, toggleFavLike } from "../../redux/question/question.actions";
import { updateLike } from "../../firebase/firebase";

//import { selectLiked } from "../../redux/question/question.selectors";

import { selectCurrentUserId } from "../../redux/user/user.selectors";

import { useSelector, useDispatch } from "react-redux";

const LikeButton = ({ home, liked, id }) => {
  const dispatch = useDispatch();
  //const chosenQuestion = useSelector(selectChosenQuestion);
  //const { id } = chosenQuestion ? chosenQuestion : "";
  const userId = useSelector(selectCurrentUserId);
  //const liked = useSelector(selectLiked);

  const handleClick = () => {
    if(home) {
      dispatch(toggleLike());
    }else {
      dispatch(toggleFavLike());
    }
  };

  useEffect(() => {
    if (liked) {
      //console.log("true state", liked);
      updateLike(id, 1, userId);
    } else if (liked === undefined) {
      //console.log("undefined state", liked);
    } else {
      //console.log("false state", liked);
      updateLike(id, 0, userId);
    }
  }, [liked, id, userId]);

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
