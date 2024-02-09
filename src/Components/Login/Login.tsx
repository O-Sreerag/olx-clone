import React, {useState, FormEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../config/supabase';

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const {data , error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (error) {
        console.error('Error logging in:', error.message);
        if (error.message === 'Email not confirmed') {
          // Handle email not confirmed error
          alert('Email not confirmed. Please check your email for verification instructions.');
        }
        return;
      }
  
      console.log('User logged in successfully:', data);

      // Store session information in local storage or cookies
      console.log(data.session)
      localStorage.setItem('supabaseSession', JSON.stringify(data?.session));

      navigate('/');
    } catch (error) {
      console.error('Error logging in:', (error as Error).message);
    }
  }; 


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onClick={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
