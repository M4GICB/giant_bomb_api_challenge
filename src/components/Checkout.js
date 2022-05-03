import React, { useState, useContext } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { CartContext } from "../Helper/Context";
import { Link } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';

export default function Checkout() {

  const {cart, setCart } = useContext(CartContext);

  return (
    <>
      <h1>CHECK OUT SUCCESSFUL! THE GAMES BELOW HAVE BEEN SUCCESSFULLY RENTED</h1>
      <Grid
      container spacing={5}
      sx={{
        width: '90vw',
        margin: 'auto',
      }}>
        {cart.map(game => ( 
          <Grid item xs={3} key={game[0]}>
            <Card sx={{ width:350, height:300}}>
                <CardMedia
                    component="img"
                    height="140"
                    image={game[1]}
                    alt={game[2]}
                />

                <CardContent >
                    <Typography textAlign='center' gutterBottom variant="h5" component="div"> {game[2]} </Typography>
                </CardContent>

                <CardActions sx={{ marginLeft:2 }}>
                <Link to={"/Game/" + game[0]} style={{ textDecoration: 'none' }}>
                  <Button size="small"> View Game </Button>
                </Link>
                </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}></Grid>
      </Grid>
    </>
  );
}