import React, { usestate } from 'react';

export default function Date(props) {
    const [ state, setState ] = useState({ Date: '', N_of_guests: '', Theme: '', Budget: '', Party_name: '' });

    function handleSubmit(event) {
        event.preventDefault();
        console.log('state ', state);
    }

    function handleChange(event) {
        const updatedState = { ...state, [event.target.name]: event.target.value };
        setState(updatedState);
    }

    return (
		<div className='Date'>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<label>
						Date
						<input type='text' name='Date' value={state.Date} onChange={handleChange} />
					</label>
					<label>
						Number of Guests
						<input type='text' name='N_of_guests' value={state.N_of_guests} onChange={handleChange} />
					</label>
					<label>
						Theme
						<input type='text' name='Theme' value={state.Theme} onChange={handleChange} />
					</label>
					<label>
						Budget
						<input type='text' name='Budget' value={state.Budget} onChange={handleChange} />
					</label>
					<label>
						Party Name
						<input type='text' name='Party_name' value={state.Party_name} onChange={handleChange} />
					</label>
					<button type='submit'>Submit</button>
				</fieldset>
			</form>
		</div>
    );
}


