import React, { Fragment, useContext, useEffect, useState } from 'react';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { ActionsContext } from '../../contexts/ActionsContext';
import CreateList from '../../contexts/ActionsContext';
import styled from 'styled-components';

const useStyles = makeStyles(theme=>({
  card: {
    color: '#fff',
    background: '#B33771',
    border: 2,
  },

  title: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },

  pos: {
    marginBottom: 12,
  },

  single: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginTop: theme.spacing(8),
  }
}));

function Party(props) {
  const userId = useSelector(state => state.auth.user.userID);
  const party = useSelector(state => state.party.party);
  const isLoading = useSelector(state => state.party.isLoading);
  const initialState = {
    id: 0,
    party_name: '',
    n_of_guests: 0,
    date: '',
    theme: '',
    budget: 0,
    user_id: userId,
  };
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isSingle, setIsSingle] = useState(false);
  const { partyActions: { fetchParty, deleteParty } } = useContext(
    ActionsContext,
  );
  const [values, setValues] = useState(initialState);

  useEffect(() => props.match.params.id && setIsSingle(true), []);
  useEffect(() => {
    props.match.params &&
    props.match.params.id &&
    fetchParty(props.match.params.id);
  }, []);

  useEffect(
    () => {
      if (party && party.id && props.match.params && props.match.params.id) {
        setValues(party);
      } else if (props.item && props.item.id) {
        setValues(props.item);
      }
    },
    [party],
  );

  function handleConfirm(id) {
    deleteParty(id);
    setOpen(false);
  }

  const children = (
    <Grid item xs={12} sm={6} md={4}>
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
        >
          {`Party Name: ${values.party_name}`}
        </Typography>
        <Typography className={classes.pos}>
          {`Number of Guests: ${values.n_of_guests}`}
        </Typography>
        <Typography className={classes.pos}>
          {`Date: ${moment(values.date).format(
            'MMMM Do YYYY, h:mm:ss a',
          )}`}
        </Typography>
        <Typography className={classes.pos}>
          {`Theme: ${values.theme}`}
        </Typography>
        <Typography className={classes.pos}>
          {`Budget: ${values.budget}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          color='secondary'
          size='large'
          component={RouterLink}
          to={`/dashboard/view-party/${values.id}`}
        >
          View
        </Button>
        {userId === values.user_id && (
          <Button
            color='secondary'
            size='large'
            component={RouterLink}
            to={`/dashboard/edit-party/${values.id}`}
          >
            Edit
          </Button>
        )}
        {userId === values.user_id && (
          <Button
            color='secondary'
            size='large'
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        )}
        <Dialog
          open={open}
          onClose={handleConfirm}
          aria-labelledby='confirm-delete-title'
          aria-describedby='confirm-delete-description'
        >
          <DialogTitle
            id='confirm-delete-title'
          >{`Are you sure you want to delete ${values.party_name}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id='confirm-delete-description'>
              {`Once you click DELETE, ${values.party_name} will be deleted.  Are you sure?`}
            </DialogContentText>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color='primary'>
                Cancel
              </Button>
              <Button
                onClick={() => handleConfirm(values.id)}
                color='primary'
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </CardActions>
    </Card>

  </Grid>
  )

  if (isSingle) {
    return (
      <div className={classes.single}>
        {children}
        {isSingle && userId === values.user_id && <CreateList/>}
      </div>
    )
  } else {
    return (
      <Fragment>
        {children}
      </Fragment>
    );
  }
}

export default withRouter(Party);