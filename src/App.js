import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import reportWebVitals from './reportWebVitals';

import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Search from './components/Search';
import Navigation from './components/Navigation';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Game from './components/Game';
import NotFound from './components/NotFound';
import { Box } from '@mui/material';
import {CartContext} from './Helper/Context';

function App() {

  const [cart, setCart] = useState([])

  return (
    <>
    <BrowserRouter>
      <CartContext.Provider value={{ cart, setCart}}>
        <Navigation />
        <Box sx={{ paddingTop: '72px', }}></Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="/game/" element={<Game />} />
            <Route path="/game/:game_id" element={<Game />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </CartContext.Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
