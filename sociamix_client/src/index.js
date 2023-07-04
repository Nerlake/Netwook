import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RouterPage from './RouterPage'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterPage />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
