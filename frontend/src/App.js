import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom'
import Artist from './pages/Artist'
import Song from './pages/Song'
import Album from './pages/Album'
import Login from './pages/LoginPage'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { green } from '@material-ui/core/colors'
import Layout from './components/Layout'
import React from 'react'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: green
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

function App() {
  return (
    
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Layout>
            <Routes>
            {/* <Switch> */}
              <Route element={<PrivateRoute />}>
                  <Route element={<Artist/>} path="/" exact/>
                  <Route element={<Song/>} path="/songs"/>
                  <Route element={<Album/>} path="/albums"/>
              </Route>
              <Route path="/login" element={<Login />}/>
              {/* <Route path="/" element={<PrivateRoute><Artist /></PrivateRoute>} />
              <Route path="/songs" element={<PrivateRoute><Song /></PrivateRoute>} />
              <Route path="/albums" element={<PrivateRoute><Album /></PrivateRoute>} />
              <Route path="/login" element={<Login />}/> */}
              {/* <Route exact path="/">
                <Artist />
              </Route>
              <Route path="/songs">
                <Song />
              </Route>
              <Route path="/albums">
                <Album />
              </Route>
              <Route path="/login">
                <Login />
              </Route> */}
            {/* </Switch> */}
            </Routes>
          </Layout>
        </AuthProvider>
      </Router>
    </ThemeProvider>
    
  );
}

export default App;




