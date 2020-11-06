import React from "react";

import './homepage.css'

import Dilemma from "components/dilemma/dilemma";
import Options from "components/options/options";
import Ratio from "components/ratio/ratio";
import NextButton from "components/next-button/next-button";
import ShareFooter from "components/share-footer/share-footer";

import { useSelector } from "react-redux";

import { selectShowOptions } from "redux/question/question.selectors";

const Homepage = () => {
  const showOptions = useSelector(selectShowOptions);
  return (
    <div className='homepage-container'>
      <Dilemma />
      {showOptions ? <Options /> : <Ratio />}
      {showOptions ? null : <NextButton />}
      <ShareFooter />
    </div>
  );
};

export default Homepage;
