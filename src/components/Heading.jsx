import React from 'react';
import logo from '../img/logo.svg';


export default function Heading() {
  return (
    <div className="heading">
        <h1>To-Do List</h1>
        <img src={logo} alt="logo" className="logo" />
    </div>
  );
}
