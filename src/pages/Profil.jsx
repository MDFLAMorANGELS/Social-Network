import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function Profil({ isAuthenticated }) {
  const navigate = useNavigate();
  const token = Cookies.get('token')
  try {
    const response =  fetch('http://localhost:1337/api/users/me', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
    const data = response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }

  if (!isAuthenticated) {
    navigate('/signin');
    return null;
  }
  return (
    <>
      <div></div>
    </>
  )
}

export default Profil