import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import './css/pokemon.css';
import './css/component.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Opzionale: usa reportWebVitals se vuoi
reportWebVitals();
