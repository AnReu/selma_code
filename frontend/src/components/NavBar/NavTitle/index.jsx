import React from 'react';

import { Box, Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const CustomLink = props => {
  const { navigate, ...rest } = props;
  return (<Link {...rest} />);
}

const NavTitle = ({ heading }) => {
  return (
    <Box pr={2} key={heading.name}>
      <RouterLink
        to={`/${heading.route}`}
        component={CustomLink}
        color="inherit"
      >
        <Typography variant="h5">
          {heading.name}
        </Typography>
      </RouterLink>
    </Box>
  );
};

export default NavTitle;