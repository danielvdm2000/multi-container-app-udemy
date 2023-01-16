import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import OtherPage from './OtherPage';
import FibPage from './FibPage'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <Routes>
              <Route path='/' element={<FibPage />}></Route>
              <Route path='otherpage' element={<OtherPage />}></Route>
            </Routes>
          </div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
