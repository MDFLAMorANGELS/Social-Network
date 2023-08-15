import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


function Signup({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    form.reset();

    try {
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      const data = await response.json();
      console.log(data);
      if (data.jwt){
        const token = data.jwt;
        Cookies.set('token', token);
        setIsAuthenticated(true);
        console.log("CONNECTED")
        navigate('/profil')
      } else {
        setErrorMessage(data.error.message);
        console.log(data.error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  return (
    <div className='d-flex justify-content-center align-items-center py-5'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className='form-label'>Username : </label>
          <input type="text" className='form-control' id="username" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="email" className='form-label'>Email : </label>
          <input type="email" className='form-control' id="email" name="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password" className='form-label'>Password : </label>
          <input type="password" className='form-control' id="password" name="password" />
        </div>
        <button type="submit" className='btn btn-primary mt-4'>Submit</button>
        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
      </form>
    </div>
    
  );
}

export default Signup