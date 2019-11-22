import axios from 'axios';

const token = localStorage.getItem('token'); // TODO: Determine Name of LocalStorage Key

export const partyApi = axios.create({
	baseURL : 'http://localhost:4000',
});

export const partyApiWithAuth = axios.create({
	baseURL : 'http://localhost:4000',
	headers : {
		'Content-Type' : 'application/json',
		Authorization  : token,
	},
});

// https://be-partyplanner.herokuapp.com'