import React, { useContext, useEffect } from 'react';
import Party from './Party';
import { useSelector } from 'react-redux';
import { ActionsContext } from '../../contexts/ActionsContext';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    textAlign: 'center',
  },
}));

const CardContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Dashboard = () => {
  const username = useSelector(state=>state.auth.user.username);
  const parties = useSelector(state => state.party.parties);
  const { partyActions: { fetchParties } } = useContext(ActionsContext);
  const classes = useStyles();
  useEffect(() => fetchParties(), []);
  return (
    <DashboardContainer>
      <Typography className={classes.title} variant='h2' component="h1" color='secondary'>{`Time for a party ${username.toUpperCase()}!`}</Typography>
      <CardContainer>
        <Grid container spacing={2}>
          {parties.map((item, i) => <Party item={item} key={i}/>)}
        </Grid>
      </CardContainer>
    </DashboardContainer>
  );
};
export default Dashboard;
