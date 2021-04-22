import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import store from './store';
import ApiService from './Services/apiServises';
import App from './Components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundry from './Components/ErrorBoundry';
import { ServiceProvider } from './Components/ServiseContext';

const apiServise = new ApiService();


ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <ServiceProvider value={apiServise}>
                <Router>
                    <App />
                </Router>
            </ServiceProvider>
        </ErrorBoundry>
    </Provider>
    , document.getElementById('root'));


