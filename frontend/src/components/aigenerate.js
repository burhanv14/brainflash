import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import AIQuestionGenerator from './AIQuestionGenerator';

function Aigenerate() {
    const navigate = useNavigate();
    const [genre, setGenre] = useState('');
    const [generatedQuestion, setGeneratedQuestion] = useState('');
    const [generatedAnswer, setGeneratedAnswer] = useState('');
    const [flashcardReady, setFlashcardReady] = useState(false);

    const createCard = (e) => {
        e.preventDefault();
        const unique_id = uuid();
        const uid = unique_id.slice(10);
        axios.post('http://localhost:8081/create', { uid, question: generatedQuestion, answer: generatedAnswer })
            .then(res => {
                navigate('/admin/aNygdehueQ');
            })
            .catch(err => alert(err));
    };

    const handleGenerate = ({ question, answer }) => {
        setGeneratedQuestion(question);
        setGeneratedAnswer(answer);
        setFlashcardReady(true);
    };

    return (
        <div className="flex flex-col min-h-screen w-full bg-blue-100">
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
            <main className="flex-grow flex justify-center items-center p-4 bg-blue-300">
                <form
                    onSubmit={createCard}
                    className="w-full max-w-lg bg-blue-500 p-6 rounded-lg shadow-lg"
                >
                    <h2 className="text-2xl font-bold mb-4 text-white">Add a Flashcard</h2>
                    <div className="mb-4">
                        <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="genre">
                            Genre
                        </label>
                        <input
                            className="w-full p-2 border border-blue-700 rounded"
                            type="text"
                            id="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            placeholder="e.g., science, history, etc."
                        />
                    </div>
                    {!flashcardReady ? (
                        <AIQuestionGenerator
                            prompt={`Create a question and an answer based on the following genre: "${genre}"`}
                            onGenerate={handleGenerate}
                        />
                    ) : (
                        <>
                            <div className="mb-4">
                                <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="generatedQuestion">
                                    Generated Question
                                </label>
                                <p className="w-full p-2 bg-white text-black rounded">{generatedQuestion}</p>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-200 text-sm font-bold mb-2" htmlFor="generatedAnswer">
                                    Generated Answer
                                </label>
                                <p className="w-full p-2 bg-white text-black rounded">{generatedAnswer}</p>
                            </div>
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                type="submit"
                            >
                                Add Flashcard
                            </button>
                        </>
                    )}
                </form>
            </main>
        </div>
    );
}

export default Aigenerate;
