import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { Grid, Row, Col } from 'rsuite';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';


import Axios from "axios";

Axios.defaults.withCredentials = true;



const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


const Drop = () => {
  const [namecat, setNamecat]=useState("");
  const [positioncat, setPositioncat]=useState("");
  const [qualificat, setQualicat]=useState("");
  const [agecat, setAgecat]=useState("");
  const [open, setOpen] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let arr = [];
  let namearr = [];
  let posarr = [];
  let qualifiarr = [];
  let agearr = [];
  const catdata = () => {
    Axios.post("http://localhost:3001/catdata", {
      name: namecat,
      position: positioncat,
      qualification: qualificat,
      age: agecat,
    })
    .then((response) => {
      if (response.data.message) {
      
        console.log("email");
      } else {
        console.log("summa");
      }
    });
  };
 
  useEffect(() => {
    Axios.get("http://localhost:3001/getdata").then((result) => {
      if (result) {
        for (let i = 0; i < result["data"].length; i++) {
          namearr.push(result["data"][i].name);
          posarr.push(result["data"][i].position);
          qualifiarr.push(result["data"][i].qualification);
          agearr.push(result["data"][i].age);
          console.log(posarr);
          arr.push(result["data"][i]);
 
        }

      }
    });
  }, );
    return (
        <div>
           <div className="root">
      <AppBar >
        <Toolbar>
          <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="title">
            Icon
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div> 
    <div className="btn">
    <Button  appearance="primary" onClick={handleClickOpen}>New</Button>
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Fields
        </DialogTitle>
        <DialogContent dividers>
          <Grid>
        <Row className="show-grid">
      <Col xs={12}>
      <TextField
      input="true"
      className="pr-1"
          id="standard-multiline-flexible"
          label="Name"
          multiline
          rowsMax={4}
       onChange={e => setNamecat(e.target.value)}
       
        />
              <TextField
              input="true"
              className="pl-1"
          id="standard-multiline-flexible"
          label="Position"
          multiline
          rowsMax={4}
          onChange={e => setPositioncat(e.target.value)}
        />
        </Col>
      <Col xs={12}>
      <TextField
      input="true"
          id="standard-multiline-flexible"
          label="Qualification"
          multiline
          rowsMax={4}
          onChange={e => setQualicat(e.target.value)}
        />
         <FormControl className="form">
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
         <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={e => setAgecat(e.target.value)}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </FormControl>
        </Col>
    </Row>
  </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={catdata} color="primary">
            Save
          </Button>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
        </div>
   </div>
        
    );
};

export default Drop;
