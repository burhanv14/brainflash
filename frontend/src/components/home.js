import React, { useEffect, useState } from 'react';
import Header from './header';
import DisplayCards from './displayCards';

export default function Home() {

  return (
    <div className="h-screen w-full flex flex-col">
      <Header />
      <div className="bg-blue-200 w-full h-full flex justify-center items-center">
        <DisplayCards/> 
        </div>
    </div>
  );
}