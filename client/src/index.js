import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import { AppContextProvider } from './Components/context';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </React.StrictMode>
);

reportWebVitals();
