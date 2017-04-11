import React from 'react';
import ReactDOM from 'react-dom';
import Steps from './Steps';

const steps = [
    {
      title: 'Design',
      active:  true
    },
    {
      title: 'Build',
      active:  true
    },
    {
      title: 'Launch',
      active:  false
    }
];


ReactDOM.render(
  <Steps steps={steps} />,
  document.getElementById('root')
);
