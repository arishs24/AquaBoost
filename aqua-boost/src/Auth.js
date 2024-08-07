import React, { useState } from 'react';
import { auth } from './firebase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleSignUp = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Error signing up', error);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.email}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Auth;
