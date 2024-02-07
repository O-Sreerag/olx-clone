import {useState, useContext, FormEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseContext } from '../../Store/FirebaseContext';
import { createUserWithEmailAndPassword, updateProfile,} from "@firebase/auth";
import { addDoc, collection } from '@firebase/firestore';

import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const {db,auth} = useContext(FirebaseContext)
  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<number>();
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential: { user: any; }) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: username,
        }).then(() => {
          console.log("success");

          // Add user data to Firestore
          addDoc(collection(db,"users"), {
            id: user.uid,
            username: username,
            email:email,
            password:password,
            phone:phone

          }).then((docRef) => {
              console.log("User added to Firestore:", docRef.id);
              navigate('/login')
          }).catch((error) => {
              console.log("Error adding user to Firestore:", error);
          });

        }).catch((error: any) => {
          console.log("Error updating profile:", error);
        });
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error creating user:", error);
      });
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Username</label>
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
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(Number(e.target.value))}
            />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <br />
          <br />
          <button type='submit'>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
