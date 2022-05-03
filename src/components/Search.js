import React, { useState } from "react";
import {CartContext} from "../Helper/Context";
import { Link } from 'react-router-dom';
import { TextField, Button, Grid, Typography } from '@mui/material';
import SearchGridData from './SearchGridData';

export default function Search() {

  const [query, setQuery] = useState(null);
  const handleSearch = () => { setQuery(document.querySelector('[name=query]').value); };

  return (
      <>
      <Grid container spacing={3} sx={{width: '90%', margin: 'auto' }}>
        <Grid item xs={10} >
          <TextField
            label="Game Title"
            variant="outlined"
            name="query"
            sx={{ width: "100%" }}
            inputProps={{
              maxLength: 100,
            }}
          />               
        </Grid>

        <Grid item xs={2} >
         <Button variant="contained" size="large" onClick={ handleSearch } sx={{ width: "100%" }}>Search</Button>
        </Grid>
        <Grid item xs={12} >
          <SearchGridData query={query} />
        </Grid>
      </Grid>
      </>
  );
}