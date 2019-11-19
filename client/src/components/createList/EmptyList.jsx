import React from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        textAlign: 'center'

    },
});

export default function EmptyList() {
    const classes = useStyles();
    return (
      <div className={classes.card}>
          <h2>Start your list now!</h2>
          <h1>🎉</h1>
      </div>
    );
}