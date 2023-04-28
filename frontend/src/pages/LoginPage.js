// import React from 'react'

// const LoginPage = () => {

//     let loginUser = (e) => {
//         e.preventDefault()
//     }

//     return (
//         <div>
//             <form onSubmit={loginUser}>
//                 <input type="text" name="username" placeholder="Enter username"/>
//                 <input type="password" name="password" placeholder="enter password"/>
//                 <input type="submit"/>
//             </form>
//         </div>
//     )
// }

// export default LoginPage


//  ---------------------------------------------------------------------------------------
// import React, {useContext} from 'react'
// import AuthContext from '../context/AuthContext'

// const LoginPage = () => {
//     let {loginUser} = useContext(AuthContext)
//     return (
//         <div>
//             <form onSubmit={loginUser}>
//                 <input type="text" name="username" placeholder="Enter Username" />
//                 <input type="password" name="password" placeholder="Enter Password" />
//                 <input type="submit"/>
//             </form>
//         </div>
//     )
// }

// export default LoginPage

//  ----------------------------------------------------------------------------------------



import React, { useContext } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../context/AuthContext";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
    marginTop: "20px"
  },
  results: {
    marginTop: theme.spacing(2),
  },
  myDiv: {
    marginBottom: "30px",
  },
}));


const LoginPage = () => {
  let { loginUser } = useContext(AuthContext);
  const classes = useStyles();

  return (
    <div>
      <form className={classes.form} onSubmit={loginUser}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <ListItem>
            <PermIdentityIcon color="secondary" style={{ fontSize: '50px', marginRight: '10px' }} />
            <ListItemText primary="Login" />
          </ListItem>
        </div>
        <TextField
            required
            className={classes.input}
            label="username"
            type="username"
            id="username"
        />
        <TextField
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
        />
        <Button
          className={classes.button}
          type="submit"
          color="secondary"
          variant="contained"
        //   endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
