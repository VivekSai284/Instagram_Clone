import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AddPage from './pages/AddPage';
import Notifications from './pages/Notifications'
import Profile from './pages/Profile';
import Footer from './components/Footer';
import Search from './pages/Search';
import Reels from './pages/Reels';
import Messages from './pages/Messages'
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/add' element={<AddPage/>}/>
            <Route path='/notifications' element={<Notifications/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/reels' element={<Reels/>}/>
            <Route path='/messages' element={<Messages/>}/>
            <Route path ='/profile/:userId' element={<UserProfile/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
