import React, { useState } from "react";

import "./sign-up.scss";

import { Button } from "react-bootstrap";

import FormInput from "../form-input/form-input";

import { auth, createUserProfileDocument } from "../../firebase/firebase";

const SignUp = () => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Şifreler uyuşmadı. Lütfen tekrar deneyiniz.");
      return;
    }

    //console.log(userCredentials);

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      //const snapshot = await userRef.get()

      //console.log(snapshot.data())

      setUserCredentials({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      //console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">Hesap Oluştur</h2>
      <span className="subtitle">Email ve şifrenizle hesap oluşturun</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Kullanıcı Adı"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Şifre"
          required
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Şifre (Tekrar)"
          required
        />
        <div className="buttons">
          <Button type="submit" variant="outline-light">
            Kaydol
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
