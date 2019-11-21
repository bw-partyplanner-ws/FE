import React from 'react';
import styled from 'styled-components';
import Login from './Login';
import { useAuthActions } from '../store/auth/useAuthActions';
import { ActionsProvider } from '../contexts/ActionsContext';
import { Route, Switch } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import AddPartyForm from './Dashboard/AddPartyForm';
import { usePartyActions } from '../store/party/usePartyActions';
import Navigation from './navigation/Navigation';
import party from '../imgs/party.jpg';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Dashboard from './Dashboard/Dashboard';
import PrivateRoute from './auth/PrivateRoute';
import Party from './Dashboard/Party';

import CreateList from './createList/Items';

import { useShoppingActions } from '../store/shopping/useShoppingActions';
import AddListItem from './Dashboard/AddListItem';
import { useTodoActions } from '../store/todos/useTodoActions';
const theme = createMuiTheme({
	typography : {},
	palette    : {
		primary   : { main: '#B33771' },
		secondary : { main: '#FEA47F' },
	},
});

const BackgroundImage = styled.div`
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 3.5% 0;
	background-attachment: fixed;
	background-image: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.1) 0,
			rgba(255, 255, 255, 0.1) 100%
		),
		url(${party});
	background-repeat: repeat;
	background-position: center center;
	background-size: cover;
`;

const App = () => {
	const authActions = useAuthActions();
	const partyActions = usePartyActions();
	const shoppingActions = useShoppingActions();
	const todoActions = useTodoActions();

	return (
		<MuiThemeProvider theme={theme}>
			<ActionsProvider
				value={{ authActions, partyActions, shoppingActions, todoActions }}>
				<CssBaseline />
				<BackgroundImage>
					<Navigation />
					<Container fluid>
						<Switch>
							<PrivateRoute
								path='/dashboard/view-party/:id/edit-todo-item/:listId'
								mode='todo'
								component={AddListItem}
							/>
							<PrivateRoute
								path='/dashboard/view-party/:id/add-todo-item'
								mode='todo'
								component={AddListItem}
							/>
							<PrivateRoute
								path='/dashboard/view-party/:id/edit-shop-item/:listId'
								mode='shopping'
								component={AddListItem}
							/>
							<PrivateRoute
								path='/dashboard/view-party/:id/add-shop-item'
								mode='shopping'
								component={AddListItem}
							/>
							<PrivateRoute
								path='/dashboard/view-party/:id'
								component={Party}
							/>
							<PrivateRoute
								path='/dashboard/edit-party/:id'
								component={AddPartyForm}
							/>
							<PrivateRoute
								path='/dashboard/add-party'
								component={AddPartyForm}
							/>
							<PrivateRoute path='/dashboard' component={Dashboard} />
							<Route path='/register' render={props => <Login {...props} />} />
							<Route path='/' render={props => <Login {...props} />} />
						</Switch>
					</Container>
				</BackgroundImage>
			</ActionsProvider>
		</MuiThemeProvider>
	);
};

export default App;
