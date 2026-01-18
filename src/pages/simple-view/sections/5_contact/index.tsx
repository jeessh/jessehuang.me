import React from "react";
import styled from "styled-components";

type ContactTypes = {
    scrolled: boolean
}

const Contact = (props: ContactTypes) => {
  return props.scrolled ? <div>Contact Version {props.scrolled}</div> : <div>Contact</div>;
};

export default Contact;
