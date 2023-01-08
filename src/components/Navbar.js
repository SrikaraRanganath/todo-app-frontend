import React,{useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Navbar = (props) => {
    const [active, setActive] = useState('Home');
    const navigate = useNavigate();
    const [user, setUser]= useState(undefined);
    const {auth, setAuth} = props;

    useEffect(() => {
        if(localStorage.getItem('profile')) {
            setUser(JSON.parse(localStorage.getItem('profile')).result.name.split(' ')[0].toLowerCase());
        }
    },[auth]);

    const onLogout = () => {
        localStorage.clear();
        navigate('/signup');
        setUser(undefined);
        setAuth(false);
    }

    return (
        <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                <img className="block h-8 w-auto lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                <img className="hidden h-8 w-auto lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                <h3 className='text-white px-3 py-2 rounded-md text-md font-medium text-xl'>Todo App</h3>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                    <Link to='/' style={{marginTop: '2%'}}>
                        <button className={active==='Home'?'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium':'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium' }  onClick={() => setActive('Home')}>Home</button>
                    </Link>
                    { auth === false
                    ?
                    (
                    <div>
                    <Link to='/login' style={{position:'relative', top: '10%'}}>
                        <button className={active==='Login'?'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium':'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium' }  onClick={() => setActive('Login')}>Login</button>
                    </Link>
                    <Link to='/signup' style={{position:'relative', top: '10%'}}>
                        <button className={active==='Signup'?'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium':'text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium' } onClick={() => setActive('Signup')}>Signup</button>
                    </Link>
                    </div>
                    )
                    :
                    (
                    <Link to='/signup' style={{marginTop: '2%'}}>
                    <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={onLogout}>Logout</button>
                    </Link>
                    )   
                    }
                </div>
                </div>
            </div>
            <div className="flex -space-x-2 overflow-hidden">
                <p className='text-lg text-white font-medium' style={{marginTop: '2%'}}>{user!==undefined ? `hello, ${user}` : null}</p>
            </div>
            </div>
        </div>
    </nav>
    );
}

export default Navbar;