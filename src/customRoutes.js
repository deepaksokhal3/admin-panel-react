import React             from 'react';
import { Route }         from 'react-router-dom';
import ConfirmPage       from './components/confirm-password/ConfirmForm.js';

const  customRoutes =  [
    <Route
        exact
        path='/reset-password'
        component={ConfirmPage}
        noLayout
        key= 'reset'
    />
];

export default customRoutes;
