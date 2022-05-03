import React, { useState, useContext, useEffect } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {CartContext} from "../Helper/Context";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { Snackbar, Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, LinearProgress, Typography } from '@mui/material';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function Game() {

  const {cart, setCart } = useContext(CartContext);
  const { game_id } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [game, setGame] = useState([]);
  const [open, setOpen] = React.useState(false);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(`https://www.giantbomb.com/api/game/${game_id}?api_key=${process.env.REACT_APP_API_KEY}&format=json`)
      .then(res => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          if (data.error == "Object Not Found"){
            setGame([]);
          }
          else {setGame(data.results);}
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const handleAddToCart = () => {
    const newGame = [[parseInt(game_id), game.image.medium_url, game.name, game.deck]]
    const cart_and_new_game = cart.concat(newGame);
    const set  = new Set(cart_and_new_game.map(JSON.stringify));
    const newCart = Array.from(set).map(JSON.parse);
    if(newCart.length > cart.length) {
      setOpen(true);
    }
    setCart(newCart);
  }

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {return;}
    setOpen(false);
  };

  if (!isLoaded) {
    return (
      <Box sx={{ width: '100%' }}>
        <Typography textAlign='center' gutterBottom variant="h4" component="div">Loading...</Typography>
        <LinearProgress />
      </Box>
    );
  } else if (error || game.length==0) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        <Typography textAlign='center' variant="body1" component="div">Unable to find game for the provided game id. Please provide a valid game id...</Typography>
        Provided Game ID: <strong>{game_id}</strong>
      </Alert>
    );
  } else {
    return (
        <>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
              Successfully Added <strong>{game.name}</strong> to Cart!
            </Alert>
          </Snackbar>
          <Card sx={{ width: "80%", margin: 'auto' }}> 
            <CardContent >
                <Typography textAlign='center' gutterBottom variant="h2" component="div"> {game.name} </Typography>
                <Typography textAlign='center' variant="h5">{game.deck}</Typography>
            </CardContent>

            <CardActions sx={{ margin: 'auto' }}>
              <Button sx={{ margin: 'auto'}} variant="contained" size="large" onClick={ handleAddToCart }>Add to Cart</Button>
            </CardActions>
          </Card>

          <br></br>
          <br></br>
          <br></br>
          
          <Card sx={{ width: "80%", margin: 'auto' }}>
            <CardContent >
                <Typography textAlign='center' gutterBottom variant="h2" component="div"> Gallery </Typography>
                <ImageList sx={{ width: "100%", height: "80%", margin: 'auto' }} cols={4} gap={8}>
                  <ImageListItem >
                    <img
                      src={`${game.image.medium_url}?w=248&fit=crop&auto=format`}
                      srcSet={`${game.image.medium_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt={game.image.medium_url}
                      loading="lazy"
                    />
                  </ImageListItem>
                  {game.images.map((item) => (
                    <ImageListItem key={item.medium_url}>
                      <img
                        src={`${item.medium_url}?w=248`}
                        srcSet={`${item.medium_url}?w=248&dpr=2 2x`}
                        alt={item.medium_url}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
            </CardContent>
          </Card>

          <br></br>
          <br></br>
          <br></br>

          <Card sx={{ width: "80%", margin: 'auto' }}>
            <CardContent >
                <Typography textAlign='center' gutterBottom variant="h2" component="div"> More Info </Typography>
                <div dangerouslySetInnerHTML={{__html:game.description}} />
            </CardContent>
          </Card>

          <br></br>
          <br></br>
          <br></br>

          <Card sx={{ width: "80%", margin: 'auto' }}>
            <CardContent >
                <Typography textAlign='center' gutterBottom variant="h2" component="div"> Giant Bomb Entry </Typography>
                <Typography textAlign='center' gutterBottom variant="h4" component="div">
                  <a href={game.site_detail_url} target="_blank">Click Here</a> to view this game on giantbomb.com
                </Typography>
            </CardContent>
          </Card>
          {console.log(game)}
        </>
    );
  }
}