import React, { useState } from "react";

import "./suggest-form.css";

import { Form, Button } from "react-bootstrap";
import { Send } from "react-feather";

import { suggestDilemma } from "../../firebase/firebase";

const SuggestForm = () => {
  const [suggestForm, setSuggestForm] = useState({
    firstOption: "",
    secondOption: "",
  });
  const { firstOption, secondOption } = suggestForm;

  const handleChange = (event) => {
    const { value, name } = event.target;
    setSuggestForm({ ...suggestForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(suggestForm);
    suggestDilemma(firstOption, secondOption);
    setSuggestForm({ firstOption: "", secondOption: "" });
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            name="firstOption"
            size="lg"
            type="text"
            placeholder="İlk Seçenek"
            value={firstOption}
            onChange={handleChange}
          />
          <br />
          <h2>FAKAT</h2>
          <br />
          <Form.Control
            name="secondOption"
            size="lg"
            type="text"
            placeholder="İkinci seçenek"
            value={secondOption}
            onChange={handleChange}
          />
          <br />
          <div className="button-container">
            <Button
              disabled={
                firstOption.length === 0 || secondOption.length === 0
                  ? true
                  : false
              }
              type="submit"
              variant="light"
            >
              <Send />
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SuggestForm;
