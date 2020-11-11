import React, { useState } from "react";
import "./sign-in.scss";

import { Button } from "react-bootstrap";

import FormInput from "../form-input/form-input";

import { auth } from "../../firebase/firebase";

const SignIn = () => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      //console.log(a.user.uid)

      setCredentials({ email: "", password: "" });
    } catch (error) {
      //console.log(error);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };
  return (
    <div className="sign-in">
      <h2 className="title">Giriş Yap</h2>
      <span className="subtitle">Email ve şifrenizle giriş yapın</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          label="Email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="Şifre"
          required
        />
        <div className="buttons">
          <Button type="submit" variant="outline-light">
            {" "}
            Giriş{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
