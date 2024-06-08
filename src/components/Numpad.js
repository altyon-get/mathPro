import React from 'react';
import './Numpad.css';

const Numpad = ({ onClick }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'X', 0, 'CC'];

  return (
    <div className="numpad">
      {numbers.map((num, index) => (
        num !== '' ? (
          <button key={index} onClick={() => onClick(num)}>
            {num}
          </button>
        ) : (
          <div key={index} className="placeholder"></div>
        )
      ))}
    </div>
  );
};

export default Numpad;
