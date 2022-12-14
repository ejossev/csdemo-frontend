import './App.css';
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import Theme from './Theme'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Main from './routes/Main'
import Login from './routes/Login'
import Smoothie from './routes/Smoothie'
import Edit from './routes/Edit'
import Header from './components/Header'
import Footer from './components/Footer'

const routes = (
  <Routes>
    <Route exact path="/" element={ <Main/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/smoothie/:id" element={<Smoothie/>} />
    <Route path="/edit/:id" element={<Edit/>} />
    <Route path="/edit" element={<Edit/>} />
  </Routes>
)


function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={Theme}>
          <Header />
          <Box sx={{ minHeight: 'calc(100vh - 356px)' }}>{routes}</Box>
          <Footer />
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
