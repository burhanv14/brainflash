import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Quiz() {
    const [que, setQue] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(null);
    const [score, setScore] = useState(0);
    const [quizEnded, setQuizEnded] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/flashcard')
            .then(res => setQue(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (quizStarted) {
            const id = setInterval(() => setTimer(prev => prev + 1), 1000);
            setIntervalId(id);
        } else if (!quizStarted && intervalId) {
            clearInterval(intervalId);
        }
    }, [quizStarted]);

    const startQuiz = () => {
        setQuizStarted(true);
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setScore(0);
        setQuizEnded(false);
        setTimer(0);
    };

    const handleAnswer = (e) => {
        const answer = e.target.value;
        setUserAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[currentQuestionIndex] = answer;
            return newAnswers;
        });
    };

    const checkAnswer = () => {
        const currentQuestion = que[currentQuestionIndex];
        if (currentQuestion && userAnswers[currentQuestionIndex]) {
            if (currentQuestion.answer.toLowerCase() === userAnswers[currentQuestionIndex].toLowerCase()) {
                setScore(prev => prev + 1);
            }
        }
    };

    const nextQuestion = () => {
        checkAnswer();
        if (currentQuestionIndex < que.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            endQuiz();
        }
    };

    const endQuiz = () => {
        setQuizStarted(false);
        setQuizEnded(true);
        clearInterval(intervalId);
    };

    const quitQuiz = () => {
        setQuizStarted(false);
        setQuizEnded(true);
        clearInterval(intervalId);
    };

    const exitQuiz = () => {
        navigate('/');
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-900 relative">
            <div className="absolute w-full h-screen bg-fixed object-cover z-0">
                <Spline scene="https://prod.spline.design/leDcXUMRUnNRCeyM/scene.splinecode" />
            </div>
            {quizStarted && (
                <motion.div 
                    className="absolute top-6 left-6 text-2xl text-black font-semibold z-20 font-mono"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Time Elapsed: {timer} seconds
                </motion.div>
            )}
            {!quizStarted && !quizEnded ? (
                <motion.div 
                    className="z-10 flex flex-col items-center space-y-4 p-10 bg-white bg-opacity-90 rounded-xl shadow-xl w-full max-w-3xl"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    <h1 className="text-3xl font-bold text-gray-800">Welcome to the Quiz!</h1>
                    <p className="text-lg text-gray-600 text-center">Test your knowledge by answering the questions. Good luck!</p>
                    <motion.button 
                        onClick={startQuiz} 
                        className="px-8 py-4 bg-indigo-600 text-white rounded-full shadow-lg text-lg font-semibold"
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Start Quiz
                    </motion.button>
                </motion.div>
            ) : quizStarted ? (
                <motion.div 
                    className="z-10 w-full max-w-3xl p-16 bg-white bg-opacity-90 rounded-xl shadow-xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    <motion.div 
                        className="text-xl mb-4 font-medium text-gray-700 font-serif"
                        key={`question-${currentQuestionIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {que[currentQuestionIndex]?.question}
                    </motion.div>
                    <input 
                        type="text" 
                        placeholder="Write your answer here."
                        value={userAnswers[currentQuestionIndex] || ''} 
                        onChange={handleAnswer}
                        className="px-4 py-2 w-full border border-gray-300 rounded-lg mb-4 text-gray-800"
                    />
                    <div className="flex gap-4">
                        <motion.button 
                            onClick={nextQuestion} 
                            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Next
                        </motion.button>
                        <motion.button 
                            onClick={quitQuiz} 
                            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Quit
                        </motion.button>
                    </div>
                </motion.div>
            ) : (
                quizEnded && (
                    <motion.div 
                        className="z-10 flex flex-col items-center p-10 bg-white bg-opacity-90 rounded-xl shadow-xl w-full max-w-3xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
                        <p className="text-xl text-gray-600">Your Score: {score} / {que.length}</p>
                        <p className="text-xl text-gray-600 mt-2">Time Taken: {timer} seconds</p>
                        <div className="flex gap-4 mt-6">
                            <motion.button 
                                onClick={startQuiz} 
                                className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow-lg text-lg font-semibold"
                                whileHover={{ scale: 1.1, rotate: 2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Retry Quiz
                            </motion.button>
                            <motion.button 
                                onClick={exitQuiz} 
                                className="px-6 py-3 bg-gray-600 text-white rounded-full shadow-lg text-lg font-semibold"
                                whileHover={{ scale: 1.1, rotate: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Exit
                            </motion.button>
                        </div>
                    </motion.div>
                )
            )}
        </div>
    );
}
