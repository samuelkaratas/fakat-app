import React from "react";

import "./homepage.css";

import Dilemma from "components/dilemma/dilemma";
import Options from "components/options/options";
import Ratio from "components/ratio/ratio";
import NextButton from "components/next-button/next-button";
//import ShareFooter from "components/share-footer/share-footer";

import { useSelector } from "react-redux";

import { selectShowOptions, selectChosenQuestion, selectComments, selectLiked } from "redux/question/question.selectors";
import CommentForm from "components/comment-input/comment-input";
import Comments from "components/comments/comments";

const Homepage = () => {
  const chosenQuestion = useSelector(selectChosenQuestion);
  const showOptions = useSelector(selectShowOptions);
  const comments = useSelector(selectComments);

  const { id } = chosenQuestion ? chosenQuestion : "";
  const liked = useSelector(selectLiked);

  return (
    <div className="homepage-container">
      <Dilemma home={true} id={id} liked={liked} chosenQuestion={chosenQuestion} showOptions={showOptions} />
      {showOptions ? (
        <Options />
      ) : (
        <div className="ratio-container">
          <Ratio chosenQuestion={chosenQuestion} />
        </div>
      )}
      {showOptions ? null : <NextButton />}
      {showOptions ? null : <CommentForm id={chosenQuestion.id} home={true} />}
      {showOptions ? null : <Comments comments={comments} />}
    </div>
  );
};

export default Homepage;
