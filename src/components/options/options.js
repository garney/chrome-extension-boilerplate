import React, { useEffect, useState } from 'react';
import './options.scss';

const Options = () => {
  const [title, setTitle] = useState('');
  useEffect(() => {
    setTitle('Options');
  }, []);
  return (
    <div className="options">
      <h1>Hello {title}</h1>
    </div>
  )
};

export default Options;
