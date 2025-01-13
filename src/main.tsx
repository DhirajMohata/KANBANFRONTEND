import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import  store  from "../store/store"
import { ThemeToggle } from './components/themes/themeToggle.tsx'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'


let persistor = persistStore(store);

createRoot(document.getElementById('root')!).render(
  <ThemeProvider attribute="class" defaultTheme="light">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <App />
          <ThemeToggle />
          <Toaster position='bottom-left' />
      </PersistGate>
    </Provider>
  </ThemeProvider>,
)
