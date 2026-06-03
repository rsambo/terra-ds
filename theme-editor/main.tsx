import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/index.css';
import { ThemeEditor } from './ThemeEditor';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeEditor />
  </React.StrictMode>
);
