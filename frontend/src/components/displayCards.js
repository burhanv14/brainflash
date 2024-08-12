import React, { useState, useEffect } from 'react';
import './DisplayCards.css'; // Import CSS for styling

export default function DisplayCards() {
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8081/flashcards')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const handlePrev = () => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="carousel-container">
            {data.length > 0 && (
                <div className={`card ${isFlipped ? 'flipped' : ''}`}>
                    <div className="card-content" onClick={handleFlip}>
                        {isFlipped ? (
                            <div className="card-face answer">
                                {data[currentIndex].answer}
                            </div>
                        ) : (
                            <div className="card-face question">
                                {data[currentIndex].question}
                            </div>
                        )}
                    </div>
                    <button className="flip-button" onClick={handleFlip}>
                        {isFlipped ? 'Hide Answer' : 'Reveal Answer'}
                    </button>
                </div>
            )}

            <div className="navigation">
                <button onClick={handlePrev}>&lt; Prev</button>
                <button onClick={handleNext}>Next &gt;</button>
            </div>
        </div>
    );
}
