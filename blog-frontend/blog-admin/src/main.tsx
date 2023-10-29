import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import 'simplebar-react/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { injectStore } from './utils/axios-utils.ts'

injectStore(store)

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>,
)
