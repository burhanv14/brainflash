import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === 'aNygdehueQ') {
          navigate('/admin/aNygdehueQ')
        } else {
          setError(true);
        }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-blue-100 flex-col">
      <h2 className="flex items-center w-full justify-center mb-4">
        <span className="flex-grow block border-t border-2 border-white"></span>
        <span className="flex-none block mx-4 px-4 py-2.5 sm:text-l md:text-2xl rounded leading-none font-medium bg-blue-900 text-white">
          Welcome back!
        </span>
        <span className="flex-grow block border-t border-2 border-white"></span>
      </h2>
      <form onSubmit={handleSubmit} className="bg-blue-200 p-8 rounded shadow-md w-1/2">
        <h2 className="text-lg font-bold mb-4">Admin-login</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter the Admin password"
          className="block w-full p-2 mb-4 border border-gray-400 rounded"
        />
        {error && <p className="text-red-500 mb-4">Invalid password</p>}
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;