import axios from 'axios';

const token = localStorage.getItem('token'); // TODO: Determine Name of LocalStorage Key

export const partyApi = axios.create({
	baseURL : 'https://be-partyplanner.herokuapp.com',
});

export const partyApiWithAuth = axios.create({
	baseURL : 'https://be-partyplanner.herokuapp.com',
	headers : {
		'Content-Type' : 'application/json',
		Authorization  : token,
	},
});