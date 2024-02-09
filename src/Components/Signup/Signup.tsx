import { useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../../config/supabase"

import Logo from "../../olx-logo.png"
import "./Signup.css"

export default function Signup() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState<number>()
  const [password, setPassword] = useState("")

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const {data , error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) {
        console.error('Error signing up:', error.message);
        return;
      }
  
      // User signed up successfully, now insert additional data into the database
      await supabase
        .from('users')
        .insert([
          { 
            email,
            username,
            phone
            // Add more fields as needed
          }
        ]); // Insert user's data into the 'users' table
  
      console.log('User signed up successfully:', data);
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', (error as Error).message);
    }
  };  

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form  onSubmit={handleSignUp}>
          <label htmlFor="name">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(Number(e.target.value))}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  )
}
