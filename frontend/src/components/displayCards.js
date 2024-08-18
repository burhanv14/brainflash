import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DisplayCards() {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [textKey, setTextKey] = useState(0); // New state to force re-render of text

    useEffect(() => {
        fetch('http://localhost:8081/flashcard')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % data.length;
            setTextKey(newIndex); // Trigger re-render with new text
            return newIndex;
        });
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => {
            const newIndex = (prevIndex - 1 + data.length) % data.length;
            setTextKey(newIndex); // Trigger re-render with new text
            return newIndex;
        });
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="flex flex-col items-center justify-center w-3/4 h-80 rounded-lg p-8 pb-6 space-y-8 z-0">
            {data.length > 0 && (
                <motion.div
                    className={`w-3/4 p-8 rounded-lg shadow-lg perspective-1000`}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className={`relative w-full h-60 text-white flex items-center justify-center bg-sky-300 rounded-lg cursor-pointer`}
                        onClick={handleFlip}
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {isFlipped ? (
                            <motion.div
                                key={textKey} // Key to trigger animation on text change
                                className="absolute w-full h-full flex items-center justify-center text-2xl p-5 pb-3 rounded-lg bg-green-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.2 }}
                            >
                                {data[currentIndex].answer}
                            </motion.div>
                        ) : (
                            <motion.div
                                key={textKey} // Key to trigger animation on text change
                                className="absolute w-full h-full flex items-center justify-center text-2xl p-5 pb-3 rounded-lg font-serif"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.2 }}
                            >
                                {data[currentIndex].question}
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}

            <motion.button
                className="px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition-colors"
                onClick={handleFlip}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {isFlipped ? 'Hide Answer' : 'Reveal Answer'}
            </motion.button>

            <div className="flex justify-between w-60">
                <button
                    onClick={handlePrev}
                    className="px-6 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                >
                    &lt; Prev
                </button>
                <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                >
                    Next &gt;
                </button>
            </div>
        </div>
    );
}
