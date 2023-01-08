import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import axios from 'axios';

const Auth = (props) => {
    const [modal, setModal] = useState(true);
    const [modalData, setModalData] = useState('');
    const {setAuth} = props;
    
    const navigate = useNavigate();
    const onLogin = async() => {
        const email = document.getElementById('email-address').value;
        const password = document.getElementById('password').value;

        if(email.length===0 || password.length===0) {
            alert('Please enter all the fields before submitting');
        }
        else {
        const loginData = {
            email,
            password
        };

        await axios
            .post('http://localhost:5001/auth/login', loginData)
            .then(({data}) => {
                localStorage.setItem('profile', JSON.stringify(data));
                setAuth(true);
                navigate(`/${data.result._id}`);
            })
            .catch((err) => {
                setModal(false)
                setModalData(err.response.data.msg);
            });
        
        }
        
    }

    const onSignup = async() => {
        const name = document.getElementById('fullname').value;
        const email = document.getElementById('email-address').value;
        const password = document.getElementById('password').value;
        const cpassword = document.getElementById('cpassword').value;
        if(name.length===0 || email.length===0 || password.length===0||cpassword.length===0) {
            alert('Please enter all the fields before submitting');
        }
        else {

            if(password!==cpassword) {
                setModal(false);
                setModalData('Passwords do not match.Please make sure to reenter the same password.');
            }

            else {
                const signupData = {
                    name,
                    email,
                    password
                }
                await axios
                    .post('http://localhost:5001/auth/signup', signupData)
                    .then(({data}) => {
                        localStorage.setItem('profile', JSON.stringify(data));
                        setAuth(true);
                        navigate(`/${data.result._id}`);
                    })
                    .catch((err) => {
                    if(err.response.status!==201 || err.response.status===400) {
                        setModal(false);
                        setModalData(err.response.data.msg);
                    }
                }); 

            }
        }
    }

    return (
        props.component==='Login' 
        ?
        (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" hidden={modal}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        
                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
                        </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Incorrect credentials</h3>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">{modalData}</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setModal(true)}>Retry</button>
                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setModal(true)}>Cancel</button>
                </div>
                </div>
            </div>
            </div>
            </div>
            <div className="w-full max-w-md space-y-8">
                <div>
                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={(event) => event.preventDefault()}>
                <input type="hidden" name="remember" value="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
                    </div>
                    <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                    </div>

                    <div className="text-sm">
                        <Link to='/signup'>
                            <button href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Dont have an account?</button>
                        </Link>
                    </div>
                </div>

                <div>
                    <button 
                    type="submit" 
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onLogin}
                    >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        
                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                        </svg>
                    </span>
                    Sign in
                    </button>
                </div>
                </form>
            </div>
        </div>
        )
        :
        (
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true" hidden={modal}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        
                        <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z" />
                        </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Incorrect credentials</h3>
                        <div className="mt-2">
                        <p className="text-sm text-gray-500">{modalData}</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setModal(true)}>Retry</button>
                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setModal(true)}>Cancel</button>
                </div>
                </div>
            </div>
            </div>
            </div>
            <div className="w-full max-w-md space-y-8">
                <div>
                <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign up to create your account</h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={(event) => event.preventDefault()}>
                <input type="hidden" name="remember" value="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                <div>
                    <label htmlFor="email-address" className="text-md font-medium">Full Name</label>
                    <input id="fullname" name="fullname" type="text" autoComplete="fullname" required className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="John Doe" />
                    </div>
                    <div style={{marginTop: '2%'}}>
                    <label htmlFor="email-address" className="text-md font-medium">Email address</label>
                    <input id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="johndoe@lynch.com" />
                    </div>
                    <div style={{marginTop: '2%'}}>
                    <label htmlFor="password" className="text-md font-medium">Password</label>
                    <input id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="**********" />
                    </div>
                    <div style={{marginTop: '2%'}}>
                    <label htmlFor="password" className="text-md font-medium">Confirm Password</label>
                    <input id="cpassword" name="cpassword" type="password" autoComplete="confirm-password" required className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="**********" />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                    </div>

                    <div className="text-sm">
                        <Link to='/login'>
                            <button className="font-medium text-indigo-600 hover:text-indigo-500">Have an account?</button>
                        </Link>
                    </div>
                </div>

                <div>
                    <button 
                    type="submit" 
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onSignup}
                    >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        
                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                        </svg>
                    </span>
                    Sign Up
                    </button>
                </div>
                </form>
            </div>
        </div>
        )
    );
};

export default Auth;