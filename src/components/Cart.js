import React, { useState, useContext } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {CartContext} from "../Helper/Context";
import { Link } from 'react-router-dom';
import { Button, Grid, Typography } from '@mui/material';

export default function Cart() {

  const {cart, setCart } = useContext(CartContext);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'thumbnail', headerName: 'Image', width: 150, renderCell: (params) => <img src={params.value} height="100%" />, },
    { field: 'title', headerName: 'Title', minWidth: 90, flex: 2},
    { field: 'desc', headerName: 'Description',  minWidth: 90, flex: 4 },
    { field: 'url', headerName: 'Details', width: 400, renderCell: (params) => <Link to={params.value}> View Game </Link> },
  ];

  const rows = [];

  const [selectedGames, setSelectedGames] = useState([]);
  const [pageSize, setPageSize] = React.useState(10);

  const handleSelectionChange = (ids) => {
    const selectedRowData = rows.filter((row) => ids.includes(row.id) );
    const games_set = new Set();
    selectedRowData.forEach((item) => { games_set.add([item.id, item.title, item.thumbnail, item.desc]); })
    setSelectedGames(Array.from(games_set));
  }
  
  const handleRemoveSelectedFromCart = () => {
    const cart_games = [];
    cart.forEach(game => cart_games.push(game))

    selectedGames.forEach((game) => {
      for(var i = 0; i < cart_games.length; i++) {
        if(cart_games[i][0] == game[0]) {
          cart_games.splice(i, 1);
          break;
        }
      }
    })

    setCart(cart_games);
  }

  return (
      <>
      <Grid container spacing={3} sx={{width: '90%', margin: 'auto' }}>
        <Grid item xs={12}>
          <Typography variant="h3"> Cart </Typography>
        </Grid>

        <Grid item xs={12}>
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
        </Grid>

        <Grid item xs={3} >
          <Button variant="contained" size="large" color="error" onClick={ handleRemoveSelectedFromCart }>Remove Selected from Cart ({selectedGames.length})</Button>
        </Grid>

        <Grid item xs={2} >
          <Link to='/Checkout' style={{ textDecoration: 'none' }}>
            <Button variant="contained" size="large" > Checkout </Button>
          </Link>
        </Grid>
      </Grid>

      {
        cart.map( (item) => {
          rows.push({ id: item[0], thumbnail: item[1], title: item[2], desc: item[3], url: "/Game/" + item[0]});
        })
      }
      </>
  );
}