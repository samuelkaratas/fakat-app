import React from "react";

import "./header.css";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { auth } from "../../firebase/firebase";

import { Link } from "react-router-dom";

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <div className="header-container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link to="/">
          <Navbar.Brand>
            <img
              alt=""
              src={require("./fakatlogo.PNG")}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            fakat.co
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/suggest">
              <Nav.Link href="/suggest">Dilemma Gönder</Nav.Link>
            </Link>
            <Link to="/favorites">
              <Nav.Link href="/favorites">Favorilerim</Nav.Link>
            </Link>
            {currentUser ? (
              <Nav.Link
                onClick={() => {
                  auth.signOut();
                }}
              >
                <span className="sign-out">Çıkış Yap</span>
              </Nav.Link>
            ) : (
              <Link to="/signin-signup">
                <Nav.Link href="/signin-signup">Giriş Yap</Nav.Link>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
