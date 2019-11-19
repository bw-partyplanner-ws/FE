import React, { useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { ActionsContext } from '../../contexts/ActionsContext';
import './AddPartyForm.css';
const TempStyle = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
// const useStyles = makeStyles(theme => ({
//   textField: {
//     color: '#FC427B',
//   }
// }));

const AddPartyForm = props => {
	console.log(props);
	const userId = useSelector(state => state.auth.user.userID);
	const party = useSelector(state => state.party.party);
	const { partyActions: { addParty, fetchParty, editParty } } = useContext(
		ActionsContext,
	);
	const [ editMode, setEditMode ] = useState(false);
	const [ values, setValues ] = useState({
		party_name  : '',
		date        : Date.now(),
		n_of_guests : 0,
		theme       : '',
		budget      : 0,
		user_id     : userId,
	});

	useEffect(() => {
		props.match &&
			props.match.params &&
			props.match.params.id &&
			setEditMode(true);
	}, []);

	useEffect(() => {
		props.match.params &&
			props.match.params.id &&
			fetchParty(props.match.params.id);
	}, []);

	useEffect(
		() => {
			party && party.id && setValues(party);
		},
		[ party ],
	);

	const handleChange = e =>
		setValues({ ...values, [e.target.name]: e.target.value });

	const handleSubmit = e => {
		e.preventDefault();
		editMode ? editParty(values) : addParty(values);
		setValues({
			party_name  : '',
			date        : Date.now(),
			n_of_guests : 0,
			theme       : '',
			budget      : 0,
			user_id     : userId,
		});
		props.history.push('/dashboard');
	};

	return (
		<TempStyle>
			<form className='editForm' onSubmit={handleSubmit}>
				<TextField
					name='party_name'
					value={values.party_name}
					label='Name of Party'
					onChange={handleChange}
				/>
				<TextField
					name='n_of_guests'
					value={values.n_of_guests}
					label='Number of Guests'
					onChange={handleChange}
				/>
				<TextField
					name='theme'
					value={values.theme}
					label='Theme of the Party'
					onChange={handleChange}
				/>
				<TextField
					name='budget'
					value={values.budget}
					label='Budget for the Party'
					onChange={handleChange}
				/>
				<TextField
					name='date'
					type='date'
					value={values.date}
					label='Date of the Party'
					onChange={handleChange}
				/>
				<Button
					className='submitButton'
					color='secondary'
					size='large'
					type='submit'>
					Submit
				</Button>
			</form>
		</TempStyle>
	);
};

export default AddPartyForm;