import React from "react";

import "./comments.css";

import { useSelector } from "react-redux";

import { selectComments } from "../../redux/question/question.selectors";
import Card from "react-bootstrap/Card";

const Comments = () => {
  const comments = useSelector(selectComments);

  const getDate = (comment) => {
    const commentDateString = comment.date.toDate().toString();
    const time = commentDateString.split(' ')[4]
    const time1 = time.split(':')
    const commentDateIso = comment.date.toDate().toISOString();
    var split1 = commentDateIso.split("T");
    var date = split1[0];
    //console.log(date);
    return date + ' / ' + time1[0] + ':' + time1[1];
  };
  return (
    <div className="comments-container">
      {comments.length ? comments.map((comment, ind) => (
        <div className="card-container" key={ind}>
          <Card
            bg="secondary"
            key={ind}
            text="white"
          >
            <Card.Header className="username">{comment.username}</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p className="paragraph">{comment.comment}</p>
                <Card.Footer>
                  <small className="footer">{getDate(comment)}</small>
                </Card.Footer>
              </blockquote>
            </Card.Body>
          </Card>
        </div>
      )) : <div><p>İlk yorumu sen yaz!</p></div>}
    </div>
  );
};

export default Comments;
