// import React, { useState } from 'react';
// import {  OpenAI } from 'openai';

// // Initialize OpenAI API client
// const configuration = new Configuration({
//     apiKey: process.env.REACT_APP_OPENAI_API_KEY // Ensure you use the correct environment variable name
// });
// const openai = new OpenAI(configuration);

// const AIQuestionGenerator = ({ prompt, onGenerate }) => {
//     const [loading, setLoading] = useState(false);

//     const generateQuestionAndAnswer = async () => {
//         setLoading(true);

//         try {
//             // Generate question and answer using OpenAI API
//             const response = await openai.createCompletion({
//                 model: 'gpt-4', // Specify the model you are using
//                 prompt: prompt,
//                 max_tokens: 150, // Adjust based on your need
//                 temperature: 0.7,
//             });

//             // Extract the generated text from the response
//             const generatedText = response.data.choices[0].text.trim();

//             // Separate the question and answer if needed
//             const [question, answer] = generatedText.split('\n').map(text => text.trim());

//             // Call the onGenerate callback to send the generated question and answer back to the parent
//             onGenerate({ question, answer });

//         } catch (error) {
//             console.error("Error generating question and answer:", error);
//             alert("There was an error generating the question and answer. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <button
//                 onClick={generateQuestionAndAnswer}
//                 className="px-4 py-2 bg-indigo-600 rounded font-semibold hover:bg-indigo-700 transition duration-200"
//                 disabled={loading}
//             >
//                 {loading ? 'Generating...' : 'Generate Question and Answer'}
//             </button>
//         </div>
//     );
// };


// export default AIQuestionGenerator;


import React from 'react'

const AIQuestionGenerator = ({ prompt, onGenerate }) => {
  return (
    <div>AIQuestionGenerator</div>
  )
};

export default AIQuestionGenerator