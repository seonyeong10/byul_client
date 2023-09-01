import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './redux/modules';
import { Provider } from 'react-redux';

import ReactModal from 'react-modal'; //Popup

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

ReactModal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
