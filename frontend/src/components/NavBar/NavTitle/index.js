import React from 'react';

import { Box, Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const NavTitle = ({ heading }) => {
  return (
    <Box pr={2} key={heading.name}>
      <RouterLink
        to={`/${heading.route}`}
        component={Link}
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