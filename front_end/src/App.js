import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Login from './components/login.js';
import Home from './components/home.js'
import Submit from './components/submit';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'black'
  },
}));

function App() {
  const classes = useStyles();
  let sty = {
    textDecoration: 'none',
  }
  const classes1 = useStyles();
  return (
    <div className={classes1.root}>
      <Router>
        <AppBar style={{ background: 'yellow' }} position="static" >

          <Toolbar style={{ textAlign: 'center' }}>
            <img src={require('./logo.PNG')} width='50px' height='50px' />
            <span style={{ color: 'black', fontSize: '25px' }}><b>CMRIT</b></span>
            <Typography variant="h6" className={classes1.title}>
              <b><i> Movie Recommendation system </i></b>
            </Typography>
            <div>
              <Link to='/' style={sty}> <b> HOME</b></Link>
              <span> {"    "}{" "}</span>
              <Link to='/login' style={sty}><b> LOGIN </b></Link>
            </div>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/Submit/:data' component={Submit} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;
