import React, { useState } from 'react';

function InputBox({ name, onValue,value }) {
  
  return (
    <div className="flex  flex-col mx-5 w-full">
      <label className="mx-3"> {name}</label>
      <input
        className="rounded-lg p-2 mx-3 outline-none w-full"
        type="text"
        onChange={(e) => {
          onValue(e.target.value);
       }}
       value={value}
        
      />
    </div>
  );
}
export default InputBox;
