import React from 'react';

import dsImage from '../components/pics/ds.png';
import algoImage from '../components/pics/algo.jpg';
import cnImage from '../components/pics/cn.jpg';
import dbmsImage from '../components/pics/dbms.jpg';
import osImage from '../components/pics/os.jpg';
import seImage from '../components/pics/se.jpg';
import aiImage from '../components/pics/ai.jpg';
import mlImage from '../components/pics/ml.jpg';
import csImage from '../components/pics/cs.jpeg';


const Card = ({ subject }) => {
  const getImageSrc = (subject) => {
    switch (subject) {
      case 'Data Structures':
        return dsImage;
      case 'Algorithms':
        return algoImage;
      case 'Computer Networks':
        return cnImage;
      case 'Database Systems':
        return dbmsImage;
      case 'Operating Systems':
        return osImage;
      case 'Software Engineering':
        return seImage;
      case 'Artificial Intelligence':
        return aiImage;
      case 'Machine Learning':
        return mlImage;
      case 'Cyber Security':
        return csImage;
      default:
        return null;
    }
  };

  const imageSrc = getImageSrc(subject);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-1/10 flex items-center justify-center" style={{ height: '300px' }}>
      <div>
        <img src={imageSrc} alt={subject} className="w-full h-full object-cover" />
        <h2 className="text-lg font-bold text-center">{subject}</h2>
      </div>
    </div>
  );
};

export default Card;
