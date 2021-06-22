// TODO: fix prop validation and remove line below
/* eslint-disable react/forbid-prop-types,react/prop-types */

import React from 'react';

import { Box, Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const CustomLink = (props) => {
  const { color, children, href } = props;

  return (<Link color={color} href={href}>{children}</Link>);
};

function NavTitle({ heading }) {
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
}

export default NavTitle;
