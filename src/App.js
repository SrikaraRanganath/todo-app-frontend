import React,{useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Todos from './components/Todos';
import Auth from './components/Auth';

const App = () => {
    
    const [auth, setAuth] = useState(localStorage.getItem('profile') ? true : false);
    return (
        <div>
            <Router>
                <Navbar auth={auth} setAuth={setAuth} />
                <Routes>
                    <Route path='/' element={<Todos auth={auth}/>} />
                    <Route path='/login' element={<Auth component='Login' setAuth={setAuth} />} />
                    <Route path='/signup' element={<Auth component='Signup' setAuth={setAuth} />} />
                    <Route path='/:id' element={<Todos auth={auth}/>} />
                </Routes>
            </Router>
        </div>
    )
}

export default App;
