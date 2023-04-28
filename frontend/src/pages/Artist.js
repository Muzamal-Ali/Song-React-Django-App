// import React, { useEffect, useState } from 'react'
// import Container from '@material-ui/core/Container'
// import Masonry from 'react-masonry-css'
// import NoteCard from '../components/NoteCard'

// export default function Notes() {
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:8000/notes')
//       .then(res => res.json())
//       .then(data => setNotes(data))
//   }, [])

//   const handleDelete = async (id) => {
//     await fetch('http://localhost:8000/notes/' + id, {
//       method: 'DELETE'
//     })
//     const newNotes = notes.filter(note => note.id != id)
//     setNotes(newNotes)
//   }

//   const breakpoints = {
//     default: 3,
//     1100: 2,
//     700: 1
//   };

//   return (
//     <Container>
//       <Masonry
//         breakpointCols={breakpoints}
//         className="my-masonry-grid"
//         columnClassName="my-masonry-grid_column">
//         {notes.map(note => (
//           <div key={note.id}>
//             <NoteCard note={note} handleDelete={handleDelete} />
//           </div>
//         ))}
//       </Masonry>
//     </Container>
//   )
// }



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button } from '@material-ui/core';

// export default function Artist() {
//   const [artists, setArtists] = useState([]);
//   const [previousPage, setPreviousPage] = useState(null);
//   const [nextPage, setNextPage] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     axios.get(`http://127.0.0.1:8000/artists/showartist/?page=${currentPage}`).then(response => {
//       setArtists(response.data.artists);
//       setPreviousPage(response.data.links.previous);
//       setNextPage(response.data.links.next);
//     });
//   }, [currentPage]);

//   const handlePreviousPage = () => {
//     setCurrentPage(previousPage);
//   };

//   const handleNextPage = () => {
//     setCurrentPage(nextPage);
//   };

//   return (
//     <div>
//       <ul>
//         {artists.map(artist => (
//           <li key={artist}>{artist}</li>
//         ))}
//       </ul>
//       <Button disabled={!previousPage} onClick={handlePreviousPage}>Previous</Button>
//       <Button disabled={!nextPage} onClick={handleNextPage}>Next</Button>
//     </div>
//   );
// }




import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, List, ListItem, ListItemText } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import AuthContext from '../context/AuthContext'




const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0),
  },
}));

export default function Artist() {
  const classes = useStyles();
  const [artists, setArtists] = useState([]);
  const [previousPage, setPreviousPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  let {authTokens, logoutUser} = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/artists/showartist/?page=${currentPage}`)
      .then(response => {
        if (!response.ok) {
          if(response.statusText === 'Unauthorized'){
            logoutUser()
          }
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setArtists(data.artists);
        setPreviousPage(data.links.previous);
        setNextPage(data.links.next);
      })
      .catch(error => console.error(error));
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage(previousPage);
  };

  const handleNextPage = () => {
    setCurrentPage(nextPage);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4">
        Famous Artists
      </Typography>
      <List>
        {artists.map(artist => (
          <ListItem key={artist}>
            <ListItemText primary={artist} />
          </ListItem>
        ))}
      </List>
      <Grid container spacing={2} justify="center">
        <Grid item>
          <Button disabled={!previousPage} onClick={handlePreviousPage} type="submit" color="secondary" variant="contained" style={{ width: "120px" }} startIcon={<KeyboardArrowLeftIcon />}>Previous</Button>
        </Grid>
        <Grid item>
          <Button disabled={!nextPage} onClick={handleNextPage} type="submit" color="secondary" variant="contained" style={{ width: "120px" }} endIcon={<KeyboardArrowRightIcon />} >Next</Button>
        </Grid>
      </Grid>
    </div>
  );
}
