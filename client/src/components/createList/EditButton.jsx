import React from 'react';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    fab: {
        color: 'white',
        background: '#F97F51',
        width: 35,
        height: 5,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));


export default function EditButton( { item } ) {
    const classes = useStyles();



    return(
        <div >
            <Fab color="secondary" aria-label="edit" className={classes.fab}>
                <Icon>edit_icon</Icon>
            </Fab>
        </div>
    );
}