import React, { useState } from "react";

import "./comment-input.css";

import { InputGroup, FormControl, Button } from "react-bootstrap";

import { postComment, getCommentsFromDatabase } from "../../firebase/firebase";

import { useSelector, useDispatch } from "react-redux";
import { selectChosenQuestion } from "../../redux/question/question.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { getComments } from "../../redux/question/question.actions";

const CommentForm = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const chosenQuestion = useSelector(selectChosenQuestion);
  const [commentForm, setCommentForm] = useState({
    comment: "",
  });
  const { comment } = commentForm;

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCommentForm({ ...commentForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(currentUser.displayName);
    //console.log(chosenQuestion.id)
    await postComment(chosenQuestion.id, comment, currentUser.displayName);
    setCommentForm({ comment: "" });
    //console.log(success);
    const comments = getCommentsFromDatabase(chosenQuestion.id);
    comments.then((data) => {
      dispatch(getComments(data));
    });
  };

  return (
    <div className="comment-form-container">
      <InputGroup className="mb-3">
        <FormControl
          disabled={currentUser ? false : true}
          placeholder={
            currentUser ? "Yorum Yaz..." : "Yorum yazabilmek için giriş yap..."
          }
          aria-label="Yorum"
          aria-describedby="basic-addon2"
          name="comment"
          type="text"
          value={comment}
          onChange={handleChange}
        />
        <InputGroup.Append>
          <Button
            className="button"
            onClick={handleSubmit}
            disabled={comment.length === 0 ? true : false}
            type="submit"
            variant="outline-secondary"
          >
            Gönder
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default CommentForm;
