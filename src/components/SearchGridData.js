import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Alert, AlertTitle, Box, Button, Card, CardContent, Grid, LinearProgress, Snackbar, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {CartContext} from "../Helper/Context";

export default function SearchGridData({ query }) {

  const {cart, setCart } = useContext(CartContext);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gameData, setGameData] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [newItems, setNewItems] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'thumbnail', headerName: 'Image', width: 150, renderCell: (params) => <img src={params.value} height="100%" />, },
    { field: 'title', headerName: 'Title', minWidth: 90, flex: 2},
    { field: 'desc', headerName: 'Description',  minWidth: 90, flex: 4 },
    { field: 'url', headerName: 'Details', width: 400, renderCell: (params) => <Link to={params.value}> View Game </Link> },
  ];

  const rows = [];

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {return;}
    setOpen(false);
  };

  const handleSelectionChange = (ids) => {
    const selectedRowData = rows.filter( (row) => ids.includes(row.id) );
    const games_set = [];
    selectedRowData.forEach((item) => {  games_set.push([item.id, item.thumbnail, item.title, item.desc]); });
    setSelectedGames(games_set);
  }

  const handleAddSelectedToCart = () => {
    const cart_and_selected = cart.concat(selectedGames);
    const set  = new Set(cart_and_selected.map(JSON.stringify));
    const newCart = Array.from(set).map(JSON.parse);
    if(newCart.length > cart.length) {
      setNewItems(newCart.length - cart.length);
      setOpen(true);
    }

    setCart(newCart);
  }

  const renderNoResultsFound = () => {
    if(query && query.length > 0) {
      return (
        <>
        <Typography textAlign='center' variant="h3">
          There were no games found for the provided search request.
        </Typography>
        <Typography textAlign='center' variant="h3">
          Please try entering a different search request.
        </Typography>
        <Typography textAlign='center' variant="h5">
          Provided Search Request: <strong>{query}</strong>
        </Typography>
        </>
      );
    }
    else {
      return (
        <>
        <Typography textAlign='center' variant="h3">
          Try searching for a game!
        </Typography>
        </>
      );
    }
  }

  useEffect(() => {
    setIsLoaded(false);
    setError(null);
    setIsLoaded(false);
    setGameData([]);
    fetch(`https://www.giantbomb.com/api/search/?api_key=${process.env.REACT_APP_API_KEY}&format=json&query="${query}"&resources=game&limit=100`)
      .then(res => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          if (query == null || query.length < 1){
            setGameData([]);
          }
          else {setGameData(data.results);}
          console.log(data)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          console.log(error)
        }
      )
      console.log(gameData)
      console.log(isLoaded);
  }, [query])

  if (!isLoaded) {
    return (
      <Box sx={{ width: '100%' }}>
        <Typography textAlign='center' gutterBottom variant="h4" component="div">Loading...</Typography>
        <LinearProgress />
      </Box>
    );
  } else if (error || gameData.length == 0) {
    return (
      <>
      <Card sx={{ width: "100%", margin: 'auto' }}> 
        <CardContent >
          <Typography textAlign='center' gutterBottom variant="h2" component="div"> No Results Found </Typography>
          <br></br>
          {renderNoResultsFound()}
        </CardContent>
      </Card>
      </>
    );
  } else {
    return (
      <>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          disableSelectionOnClick
          autoHeight={true}
          checkboxSelection
          onSelectionModelChange={ (ids) => {handleSelectionChange(ids);} }
          sx={{ marginBottom: 5}}
          onPageSizeChange={(newPage) => setPageSize(newPage)}
        />
        <Button variant="contained" size="large" onClick={ handleAddSelectedToCart }>Add Selected to Cart ({selectedGames.length})</Button>

        <Snackbar open={open} autoHideDuration={5000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Successfully Added <strong>{newItems} New Items</strong> to Cart!
          </Alert>
        </Snackbar>
        
        {gameData &&
          gameData.map((item) => {
            rows.push({ id: item.id, thumbnail: item.image.medium_url, title: item.name, desc: item.deck, url: "/Game/" + item.id});
          })
        }
      </>
    );
  }
}