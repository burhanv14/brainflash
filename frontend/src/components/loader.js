import React from 'react';
function Loading() {
  return (
    <div class=" bg-black w-screen h-screen flex justify-center items-center">
      <div class="animate-pulse flex items-center flex-row  gap-6">
        <div class="w-8 h-8 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div class="w-8 h-8 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div class="w-8 h-8 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
    </div>
    </div>
  );
}

export default Loading;