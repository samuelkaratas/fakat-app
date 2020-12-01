import React, { useState, useEffect } from "react";

import "./favorites-detail.css";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { getFavComments } from "redux/question/question.actions";

import { getSingleFav, getCommentsFromDatabase } from "../../firebase/firebase";

import { selectFavComments, selectFavLiked } from "redux/question/question.selectors";

import Dilemma from "components/dilemma/dilemma";
import Ratio from "components/ratio/ratio";

import CommentForm from "components/comment-input/comment-input";
import Comments from "components/comments/comments";

const FavoritesDetailPage = () => {
  const dispatch = useDispatch();
  const [favData, setFavData] = useState([]);
  const comments = useSelector(selectFavComments);
  let { id } = useParams();

  const liked = useSelector(selectFavLiked);

  useEffect(() => {
    getSingleFav(id).then((data) => {
      setFavData(data);
    });

    const getComments = getCommentsFromDatabase(id);
    getComments.then((data) => {
      dispatch(getFavComments(data));
    });
  }, [setFavData, id, dispatch]);

  //console.log(favData);

  return (
    <div className="favorites-detail-page-container">
      <Dilemma home={false} id={id} liked={liked} chosenQuestion={favData} />
      <div className='ratio-container'>
        <Ratio chosenQuestion={favData} />
      </div>
      <CommentForm id={id} home={false} />
      <Comments comments={comments} />
    </div>
  );
};

export default FavoritesDetailPage;
