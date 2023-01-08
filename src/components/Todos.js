import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import * as api from '../api/index.js';

const Todos = (props) => {
    const {auth} = props;
    const [todos, setTodos] = useState([]);
    const [hidden, setHidden] = useState(true);
    const [msg, setMsg] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [id, setID] = useState('');
    const onAdd = async() => {
        const title = document.getElementById('todo-title').value;
        const description = document.getElementById('todo-desc').value;
        if(title.length===0 || description.length===0) {
            alert('Please enter the title and description.');
        }
        else {
            const todoData = {
                title,
                description
            };
            
            await api
            .createTodo(JSON.parse(localStorage.getItem('profile')).result._id, todoData)
            .then(({data})=>{
                setMsg(`todo ${data.result.title} added successfully.`);
                setHidden(false);
                getTodos();
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
    const getTodos = async() => {
        await api  
            .fetchTodos(JSON.parse(localStorage.getItem('profile')).result._id)
            .then(({data})=>{
                setTodos(data);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    useEffect(() => {
        getTodos();
    },[]);
    const onDelete = async(event) => {
        await api
            .removeTodo(event.target.value)
            .then(({data}) => {
                setMsg(data.msg);
                setHidden(false);
                getTodos();
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const onUpdate = (event) => {
        todos.forEach((todo) => {
            if(todo._id === event.target.value) {
                setTitle(todo.title);
                setDesc(todo.description);
                setID(todo._id)
            }
        });
    }

    const onSendUpdate =async() => {
        const updateData = {
            title,
            description: desc,
        }
        await api 
        .editTodo(id, updateData)
        .then(({data}) => {
            setMsg(`todo ${data.title} updated successfully.`);
            setHidden(false);
            getTodos();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const onReset = () => {
        setHidden(true);
        setMsg('');
    }
    return (
        <div>
            <h1 className="text-4xl font-medium" style={{textAlign: 'center', marginTop: '1%'}}>Todo List</h1>
            {
                auth===false 
                ?
                <p className="text-xl font-medium" style={{textAlign: 'center', marginTop: '2%'}}>
                    <Link to='/login' style={{color: 'blue', textDecoration: 'underline'}}>
                        login
                    </Link> to access your todo's.
                </p>
                :
                <div style={{marginTop: '2%'}}>
                    <div className="alert alert-success" style={{width: '30%', marginLeft: '40%', display: 'inline'}} role="alert" hidden={hidden}>
                        {msg}
                        <button type="button" className="close" aria-label="Close" style={{marginLeft: '2%', fontSize: '30px'}} onClick={onReset}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                <button data-bs-toggle="modal" data-bs-target="#orangeModalSubscription" className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" style={{float: 'right', marginRight: '28%', marginBottom: '2%', display: 'inline'}} >
                    Add Todo
                </button>

                <div className="modal fade" id="orangeModalSubscription" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog modal-notify modal-warning" role="document">
                        
                        <div className="modal-content">
                        
                        <div className="modal-header text-center">
                            <h4 className="modal-title w-100 " style={{fontWeight: '700', fontSize: '24px'}}>Add a new Todo</h4>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" style={{fontSize: '30px'}}>
                            <span aria-hidden="true" className="white-text">&times;</span>
                            </button>
                        </div>

                        <form onSubmit={(event) => event.preventDefault()}>
                        <div className="modal-body">
                            <div className="md-form mb-5">
                            <i className="fas fa-user prefix grey-text"></i>
                            <label data-error="wrong" data-success="right" htmlFor="form3" style={{color:' black', fontWeight: '600'}}>todo title</label>
                            <input type="text" id="todo-title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            
                            </div>

                            <div className="md-form">
                            <i className="fas fa-envelope prefix grey-text"></i>
                            <label data-error="wrong" data-success="right" htmlFor="form2" style={{color:' black', fontWeight: '600', fontSize: '15px'}}>todo description</label>
                            <input type="email" id="todo-desc" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            </div>
                        </div>

                        
                        <div className="modal-footer justify-content-center">
                            <button type="button" data-bs-dismiss="modal" className="btn bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" onClick={onAdd}>Add</button>
                        </div>
                        </form>
                        </div>
                    </div>
                    </div>

                <div className="modal fade modal1" id="orangeModalSubscription1" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-notify modal-warning" role="document">
                    
                    <div className="modal-content">
                    
                    <div className="modal-header text-center">
                        <h4 className="modal-title w-100 " style={{fontWeight: '700', fontSize: '24px'}}>Update Todo</h4>
                        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" style={{fontSize: '30px'}}>
                        <span aria-hidden="true" className="white-text">&times;</span>
                        </button>
                    </div>

                    <form onSubmit={(event) => event.preventDefault()}>
                    <div className="modal-body">
                        <div className="md-form mb-5">
                        
                        <label data-error="wrong" data-success="right" htmlFor="todo-title" style={{color:' black', fontWeight: '600'}}>todo title</label>
                        <input type="text" id="todo-title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={title} onChange={(event) => setTitle(event.target.value)} />
                        
                        </div>

                        <div className="md-form">
                        
                        <label data-error="wrong" data-success="right" htmlFor="todo-desc" style={{color:' black', fontWeight: '600', fontSize: '15px'}}>todo description</label>
                        <input type="email" id="todo-desc" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={desc} onChange={(event) => setDesc(event.target.value)} />
                        </div>
                    </div>

                    
                    <div className="modal-footer justify-content-center">
                        <button type="button" data-bs-dismiss="modal" className="btn bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" onClick={onSendUpdate}>Update</button>
                    </div>
                    </form>
                    </div>
                </div>
                </div>

                    {   
                        todos.length===0 ?
                            <p className="text-xl font-medium" style={{textAlign: 'center', marginTop: '2%', }}>you have 0 todos currently, click on add todo =&gt;</p>
                        :
                        todos.map((todo) => {
                            return (
                                <div className="overflow-hidden bg-white shadow sm:rounded-lg" key={todo._id} style={{width: '50%',height: '5%', marginLeft: '25%', marginBottom: '2%', borderBottom: 'black 2px solid'}}>
                                    <div className="px-4 py-3 sm:px-6">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">{todo.title}</h3>
                                        <p className="mt-1 max-w-2xl text-sm text-gray-500" >{todo.description}</p>
                                        <div>
                                            <button className="btn bg-red-900 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full" style={{float: 'right', marginBottom: '2%'}} onClick={onDelete} value={todo._id}>Delete <i className="bi bi-trash text-light"></i> </button>
                                            <button className="btn bg-cyan-900 hover:bg-cyan-700 text-white font-bold py-1 px-3 rounded-full" data-bs-toggle="modal" data-bs-target="#orangeModalSubscription1" style={{float: 'right', marginRight: '2%'}} value={todo._id} onClick={onUpdate}>Update <i className="bi bi-pencil-square"></i></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
                </div>    
            }
        </div>
    )
}

export default Todos;