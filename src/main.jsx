import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
Amplify.configure(amplifyconfig);
import './index.css'
import '@aws-amplify/ui-react/styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
