import React, { useEffect, useState } from 'react';
import './pop-up.scss';

const PopUp = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle('PopUp');
  }, []);

  return (
    <div className="pop-up">
      <h1>Hello {title}</h1>
    </div>
  );
};

export default PopUp;
