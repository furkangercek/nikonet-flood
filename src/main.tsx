import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import React from 'react';

createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <App />
  </React.Fragment>
);
