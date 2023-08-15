import React from 'react';
import { Link, Outlet } from 'react-router-dom'


const  Session = () => {

  return (
    <>
    <Outlet/>
    <div className='text-center'>
      <Link className='mx-4' to="/signup">Sign up
      </Link>
      <Link className='mx-4' to="/signin">Sign in
      </Link>
    </div>
    </>
  );
}

export default Session;