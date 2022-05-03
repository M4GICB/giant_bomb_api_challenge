import React from 'react';
import Navigation from './Navigation';
import { Box, BottomNavigation, BottomNavigationAction, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
      <>
      <Card sx={{ width: "80%", height: "100%",  margin: 'auto' }}> 
          <CardContent >
            <Typography textAlign='center' gutterBottom variant="h1" component="div"> Giant Bomb API Challenge </Typography>
            
            <Grid container spacing={3} textAlign='center'>
              <Grid item xs={6} >
                  <Link to="/Search" style={{ textDecoration: 'none', color: 'black' }}>
                      <SearchIcon sx={{fontSize: 100, color: "black"}} ></SearchIcon>
                      <Typography textAlign='center' gutterBottom variant="h4" component="div">Search</Typography>
                  </Link>                
              </Grid>

              <Grid item xs={6} >
                  <Link to="/Cart" style={{ textDecoration: 'none', color: 'black' }}>
                    <ShoppingCartIcon sx={{fontSize: 100, color: "black"}} ></ShoppingCartIcon>
                    <Typography textAlign='center' gutterBottom variant="h4" component="div">View Cart</Typography>               
                  </Link>
              </Grid>
            </Grid>

            <Box sx={{ width: "80%", margin: 'auto', padding: "25px" }}> 
              <Typography textAlign='center' gutterBottom variant="h3" component="div">Search Functionality</Typography>
              <Typography textAlign='left' gutterBottom variant="h4" component="div">
                View the search page to look for games by typing game names into the provided search bar to see a list of games that match what was types.
                A list of games will be displayed detailing an image, their title, a short description, and a link to view more info about the game.
                Once desired games are found, games can be added to the car by being checked off and clicking the provided "Add Selected to Cart" button.
              </Typography>
            </Box>

            <Box sx={{ width: "80%", margin: 'auto', padding: "25px" }}> 
                <Typography textAlign='center' gutterBottom variant="h3" component="div">Cart Functionality</Typography>
                <Typography textAlign='left' gutterBottom variant="h4" component="div">
                  View the cart page to see a full list of games currently added to the cart. 
                  Similar to the search page,
                  a list of games in the cart will be displayed detailing an image, their title, a short description, and a link to view more info about the game.
                  Games can be removed from the car by being checked off and clicking the provided "Remove Selected from Cart" button.
                </Typography>
            </Box>

          </CardContent>

          <CardActions sx={{ margin: 'auto' }}>

          </CardActions>
        </Card>
      </>
    
  );
}
