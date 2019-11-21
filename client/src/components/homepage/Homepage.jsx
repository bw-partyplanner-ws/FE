import React, { useEffect,useContext } from 'react'

import styled from 'styled-components';
import { ActionsContext } from '../../contexts/ActionsContext';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Homepage = () => {
  const {partyActions: {fetchParties,fetchParty, deleteParty}} = useContext(ActionsContext);

  useEffect (()=> fetchParties(),[]);

  return (
      <Container>
        <h1>Party Planner</h1>
        <button onClick={()=>fetchParty(2)}>Fetch Single ID</button>
        <button>Post New Data</button>
        <button>Edit Data</button>
        <button onClick={()=>deleteParty(1)}>Delete Data</button>
      </Container>
  );
};

export default Homepage;