import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Admin() {
    const [que, setQue] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/flashcard')
            .then(res => setQue(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = async(uid) =>{
        try{
            await axios.delete('http://localhost:8081/delete/'+uid)
            window.location.reload()
        }catch(err){
            alert(err)
        }
    }

    return (
        <div class="min-h-screen flex flex-col bg-blue-100">
            <header class="bg-blue-500 flex justify-between items-center p-4">
                <h1 class="text-2xl text-white md:text-3xl font-sans font-bold">
                    Admin Dashboard
                </h1>
                <button 
                    class="text-white hover:text-gray-900 font-medium focus:outline-none underline underline-offset-2 focus:text-white mr-10"
                    onClick={() => navigate('/')}
                >
                    Home
                </button>
            </header>
            <main class="flex-grow flex justify-center items-center bg-blue-300 p-4">
                <div class="bg-blue-500 rounded-lg p-4 w-full max-w-4xl">
                    <div class="flex justify-between items-center mb-4">
                        <Link to="create" class="bg-blue-800 p-3 text-white rounded hover:bg-blue-900 font-serif">
                            Add a Flashcard
                        </Link>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="text-white w-full min-w-full">
                            <thead>
                                <tr>
                                    <th class="p-2">UID</th>
                                    <th class="p-2">Question</th>
                                    <th class="p-2">Answer</th>
                                    <th class="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {que.map((q, i) => (
                                    <tr key={i}>
                                        <td class="p-2 text-center">{q.uid}</td>
                                        <td class="p-2 text-center">{q.question}</td>
                                        <td class="p-2 text-center">{q.answer}</td>
                                        <td class="p-2 text-center">
                                            <Link to={`update/${q.uid}`} class="bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600 font-serif">Update</Link>
                                            <button class="bg-red-500 text-white p-2 rounded hover:bg-red-600 font-serif" onClick={e => handleDelete(q.uid)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
