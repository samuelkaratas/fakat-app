import React, { useState, useEffect } from "react";

import "./ratio.css";

import ProgressBar from "react-bootstrap/ProgressBar";

import { useSelector } from "react-redux";
import { selectChosenQuestion } from "../../redux/question/question.selectors";

const Ratio = () => {
  const [acceptPer, setAcceptPer] = useState(60);

  const chosenQuestion = useSelector(selectChosenQuestion);
  const { yesCount, noCount } = chosenQuestion;
  useEffect(() => {
    const percentage = Math.round((yesCount / (yesCount + noCount)) * 100);
    setAcceptPer(percentage ? percentage : 0);
  }, [yesCount, noCount]);

  return (
    <div className="ratio-container">
      <ProgressBar className="outer-progress">
        <ProgressBar
          variant="success"
          label={`%${acceptPer}`}
          now={acceptPer}
          key={1}
        />
        <ProgressBar
          variant="danger"
          label={`%${100 - acceptPer}`}
          now={100 - acceptPer}
          key={2}
        />
      </ProgressBar>
    </div>
  );
};

export default Ratio;
