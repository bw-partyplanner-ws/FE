import React from 'react';
import {useAuthActions} from '../store/auth/useAuthActions';
import {ActionsProvider} from '../contexts/ActionsContext';
import {Switch, Route} from 'react-router-dom';

const App = () => {
    const authActions = useAuthActions();

    return (
        <ActionsProvider value={{authActions}}>
            <Switch>
                <Route path='/' render={() => <h1>Hellow World</h1>} />
            </Switch>
        </ActionsProvider>
    );
};

export default App;