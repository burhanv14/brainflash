import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuid } from "uuid";


export default function CreateFlashCard() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(`UID: ${rand_uid}, Question: ${question}, Answer: ${answer}`);
    const unique_id = uuid();
    const uid = unique_id.slice(10);
    axios.post('http://localhost:8081/create',
        {uid, question, answer}
    ).then(res =>{
        navigate('/admin/aNygdehueQ')
    }).catch(err => alert(err));
    setQuestion('')
    setAnswer('')
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-300">
      <header className="bg-blue-500 flex justify-between items-center p-4 sticky top-0">
        <h1 className="text-2xl text-white md:text-3xl font-sans font-bold">
          Admin Dashboard
        </h1>
        <button 
          className="text-white hover:text-gray-900 font-medium focus:outline-none underline underline-offset-2 focus:text-white mr-10"
          onClick={() => navigate('/')}
        >
          Home
        </button>
      </header>
      <main className="flex-grow flex justify-center items-center p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-blue-500 p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-white">Add a Flashcard</h2>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="question">
              Question
            </label>
            <input
              className="w-full p-2 border border-blue-700 rounded"
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="answer">
              Answer
            </label>
            <input
              className="w-full p-2 border border-blue-700 rounded"
              type="text"
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
