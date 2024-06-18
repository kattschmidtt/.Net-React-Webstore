import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './Header';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from '../context/StoreContext';
import { getCookie } from '../util/util';
import agent from '../api/agent';
import Loading from './Loading';

function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => setBasket(basket))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    } else {
      setLoading(false);
    }
  }, [setBasket])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212' //retain original darkMode bg color
      }
    }
  });

  const handleThemeToggle = () => setDarkMode(!darkMode);

  if (loading) return <Loading message='Initializing app...' />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" theme="colored"/>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeToggle={handleThemeToggle}/>
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
