import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from 'firebase/auth';
import { useState } from 'react';

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();
  const handleGoogleSingIn = ()=>{
   signInWithPopup(auth, googleProvider)
   .then(result => {
    const { displayName, email, photoURL } = result.user;
    const loggedInUser = {
      name: displayName,
      email: email,
      photo: photoURL
    };
    setUser(loggedInUser);
  })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
    .then(result => {
      const {displayName, photoURL} = result.user;
      const loggedInUser = {
        name: displayName,
        photo: photoURL
      }
      setUser(loggedInUser);
    })
  }

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
    .then(result => {
      const {displayName, photoURL} = result.user;
      console.log(result.user);
      const loggedInUser = {
        name: displayName,
        photo: photoURL
      }
      setUser(loggedInUser);
    })
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(()=>{
      setUser ({});
    })
  }

  return (
    <div className="App">
      { !user.name ? 
        <div>
      <button onClick={handleGoogleSingIn}>Google Sing In</button>
      <button onClick={handleGithubSignIn}>Github Sign In</button>
      <button onClick={handleFacebookSignIn}>Facebook Sign In</button>
      </div> :
      <button onClick={handleSignOut}>Sign Out</button>
      }
      <br />
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>I know your email address: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
    </div>
  );
}

export default App;