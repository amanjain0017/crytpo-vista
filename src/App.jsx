//importing external
import { BrowserRouter, Route, Routes} from 'react-router-dom'

//importing internal
import './App.css';
import Header from './components/Header';
import CoinPage from './Pages/CoinPage';
import HomePage from './Pages/HomePage';


function App() {
  return (
    //basic routing of the page
    <BrowserRouter>
        <div className='background'>
                <Header/>
            <Routes>
                <Route path='/' Component={HomePage} exact/>
                <Route path='/coins/:id' Component={CoinPage} exact/>
            </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
