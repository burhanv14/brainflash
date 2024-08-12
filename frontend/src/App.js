import './App.css';
import React from 'react';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import LoginPage from './components/login';
import Home from './components/home';
import Admin from './components/admin';
import Header from './components/header';
import CreateFlashCard from './components/CreateFlashCard';
import UpdateFlashCard from './components/UpdateFlashCard';

function App() {
  const router = createBrowserRouter([
    {
      path :"/",
      element: <Home/>
    },
    {
      path:"/login",
      element: <LoginPage/>
    },
    {
      path:"/admin/aNygdehueQ",
      element : <Admin/>
    },
    {
      path:"/admin/aNygdehueQ/create",
      element : <CreateFlashCard/>
    },
    {
      path:"/admin/aNygdehueQ/update/:uid",
      element : <UpdateFlashCard/>
    } 
  ])
  return (
    <div>
      <RouterProvider router ={router}>
        <Header/>
      </RouterProvider>
    </div>
  );
}

export default App;
