import React from "react";

import styled from "styled-components";

const Logo = styled.div`
  max-width: 300px;
  margin: 0 auto;
`;

const Header = () => {
  return (
    <Logo>
      <img
        style={{ width: "100%" }}
        src="https://usearch.com/static/media/logo-gradient.4f9306e1.webp"
        alt="logo"
      />
    </Logo>
  );
};

export default Header;
