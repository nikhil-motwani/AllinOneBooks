import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import SideBar from './SideBar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {useSelector} from 'react-redux';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  tabs: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  }, 
  card: {
    maxWidth: '50',
    height: '100%',
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  cardMedia: {
  //  height: '75%', 
  height: 0,
  paddingTop: '87.25%', // 16:9
  },
  cardContent: {
    height: '20%',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  },
}));


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

var ratings = [];

export default function Recommendation() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const [selectedrating, setRating] = React.useState(0);

  const theme = useTheme();
  const auth = useSelector(state => state.auth);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);  

  // Function when view is clicked
  const handleListItemClick = (book, index) => {
    // PopUp book details
  };

  const handleLikedBooks = (event, isbn) => {
    const button = event.target;
 
    if(button.innerHTML === 'Like') {
      // fetch call for Like make likeFlag: 1
      fetch('http://localhost:8081/api/user/likeBook/'+isbn, {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'    
         },
         body:JSON.stringify({email: auth.auth, id:1})
       })
       .then(resp => resp.json())
       .then(resp => {
         if(resp.message === 'success') {
           button.innerHTML = 'UnLike';
         }
       });
    }else if(button.innerHTML === 'UnLike') {
      // fetch call for Unlike make likeFlag: 0
      fetch('http://localhost:8081/api/user/likeBook/'+isbn, {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'    
         },
         body:JSON.stringify({email: auth.auth, id:0})
       })
       .then(resp => resp.json())
       .then(resp => {
         if(resp.message === 'success') {
           button.innerHTML = 'Like';
         }
       });
    }
   }
 
   const handleReadBooks = (event, isbn) => {
     const button = event.target;
 
     if(button.innerHTML === 'Mark Read') {
       // fetch call for Read make readFlag: 1
       fetch('http://localhost:8081/api/user/readBook/'+isbn, {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'    
         },
         body:JSON.stringify({email: auth.auth, id:1})
       })
       .then(resp => resp.json())
       .then(resp => {
         if(resp.message === 'success') {
           button.innerHTML = 'Mark UnRead';
         }
       });
 
     }else if(button.innerHTML === 'Mark UnRead') {
       // fetch call for UnRead make readFlag: 0
       fetch('http://localhost:8081/api/user/readBook/'+isbn, {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'    
         },
         body:JSON.stringify({email: auth.auth, id:0})
       })
       .then(resp => resp.json())
       .then(resp => {
         if(resp.message === 'success') {
           button.innerHTML = 'Mark Read';
         }
       });
     }
   }


  const showrecommendation1 = () => {
    const email = auth.auth;

    // Fetch Call

    let recdiv =  < Grid item key={1} xs={3} style={{ height: '400px', width: '180px' }}>
            <Card className={classes.card}>
              <CardMedia className ={classes.cardMedia}
                image={'https://s1.nyt.com/du/books/images/9781476746586.jpg'}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h4">
                TITLE PLACE HOLDER
                </Typography>
              </CardContent>
              <CardActions style={{width:'100%'}}>
              <Button size="medium" color="textSecondary" onClick = {() => handleListItemClick('', '')}>
                  View
              </Button>
              <div style={{width: '100%', textAlign:'right'}}>  
              <Button color="secondary" onClick={(event) => {handleLikedBooks(event, 'put isbn here')}}>
               Like 
              </Button>

              <Button color="primary" onClick={(event) => {handleReadBooks(event, 'put isbn here')}}>
                Mark read
              </Button>
              </div>       
              </CardActions>
            </Card>
        </Grid >

  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar name='Recommended Books'/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.tabs}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Recommendation 1" {...a11yProps(0)} />
          <Tab label="Recommendation 2" {...a11yProps(1)} />
          <Tab label="Recommendation 3" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >

        {/* Recommendation 1 */}
        <TabPanel value={value} index={0} dir={theme.direction}>
      
          <Grid container spacing={2}> 

          {/* Book Cards */}
          {/* Call showrecommendation1 here */}
          < Grid item key={1} xs={3} style={{ height: '400px', width: '180px' }}>
            <Card className={classes.card}>
              <CardMedia className ={classes.cardMedia}
                image={'https://s1.nyt.com/du/books/images/9781476746586.jpg'}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h4">
                TITLE PLACE HOLDER
                </Typography>
              </CardContent>
              <CardActions style={{width:'100%'}}>
              <Button size="medium" color="textSecondary">
                  View
              </Button>
              <div style={{width: '100%', textAlign:'right'}}>  
              <Button color="secondary" onClick={(event) => {handleLikedBooks(event, 'put isbn here')}}>
               Like 
              </Button>

              <Button color="primary" onClick={(event) => {handleReadBooks(event, 'put isbn here')}}>
                Mark read
              </Button>
              </div>              
              </CardActions>
            </Card>
        </Grid >

        < Grid item key={1} xs={3} style={{ height: '400px', width: '180px' }}>
            <Card className={classes.card}>
              <CardMedia className ={classes.cardMedia}
                image={'https://s1.nyt.com/du/books/images/9781476746586.jpg'}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h4">
                TITLE PLACE HOLDER
                </Typography>
              </CardContent>
              <CardActions style={{width:'100%'}}>
              <Button size="medium" color="textSecondary">
                  View
              </Button>
              <div style={{width: '100%', textAlign:'right'}}>  
              <Button color="secondary" onClick={(event) => {handleLikedBooks(event, 'put isbn here')}}>
               Like 
              </Button>

              <Button color="primary" onClick={(event) => {handleReadBooks(event, 'put isbn here')}}>
                Mark read
              </Button>
              </div>       
              </CardActions>
            </Card>
          </Grid >
          </Grid>
        </TabPanel>

        {/* Recommendation 2 */}
        <TabPanel value={value} index={1} dir={theme.direction}>    
        <Grid container spacing={2}> 

         {/* Book Cards */}
         {/* Call showrecommendation2 here */}
        </Grid>      
        </TabPanel>



        {/* Recommendation 3 */}
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Grid container spacing={2}> 

            {/* Book Cards */}
            {/* Call showrecommendation3 here */}
          
        
           </Grid>          
        </TabPanel>        
      </SwipeableViews>
    </div>        
      </main>
    </div>
  );
}
