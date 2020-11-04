import React from "react";

import "./share-footer.css";

import { Instagram, Twitter, Facebook } from "react-feather";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

const ShareFooter = () => (
  <div className="footer-container">
    <ButtonGroup size="sm">
      <Button variant="secondary">
        <Instagram />
      </Button>
      <Button variant="secondary">
        <Twitter />
      </Button>
      <Button variant="secondary">
        <Facebook />
      </Button>
    </ButtonGroup>
  </div>
);

export default ShareFooter;
