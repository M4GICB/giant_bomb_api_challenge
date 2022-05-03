import React, { useState, useEffect, useContext } from "react";
import {CartContext} from "../Helper/Context";
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Menu,
  Typography
} from '@mui/material';


export default function Navigation() {

  const {cart, setCart } = useContext(CartContext);
  const pages = ['Home', 'Search'];

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Giant Bomb API Challenge
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={page} style={{ textDecoration: 'none' }} key={page}>
                <Button
                  key={page}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}

            <Link to='/Cart' style={{ textDecoration: 'none' }}>
              <Button
                key="Cart"
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                View Cart ({cart.length})
              </Button>
            </Link>
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
