import React from 'react';

import { AppBar, Toolbar } from "@material-ui/core";
import NavTitle from "./NavTitle";

const NavBar = ({ headings }) => {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        {headings.map((heading, i) =>
          <NavTitle heading={heading} key={i} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;