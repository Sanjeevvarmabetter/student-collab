import React from 'react';

const Card = ({ subject , cover}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-1/10 flex items-center justify-center" style={{ height: '300px' }}>
      <img src="cover" alt="" />
      <h2 className="text-lg font-bold text-center">{subject}</h2>
    </div>
  );
};

export default Card;
