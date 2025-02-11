import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from "react-redux";
import { Store,Persiststore } from './AuthState/Store.js';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import "./index.css"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persiststore}>
        <MantineProvider>
        <App />
        </MantineProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
