'use client'
import { useState } from 'react';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleSignIn = async () => {
    try {
        const res = await signInWithEmailAndPassword(email, password)
        console.log({res})
        sessionStorage.setItem('user', true)
        setEmail('');
        setPassword('')

    } catch(e){
        console.error(e)
        setError(e.message)
    }
  };

  return (
    <div>
      <div >
        <h1 >Sign In</h1>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className=""
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
         
        />
        <button 
          onClick={handleSignIn}
         
        >
          Sign In
        </button>
      </div>
      <p>{error}</p>
    </div>
  );
};

export default SignIn;