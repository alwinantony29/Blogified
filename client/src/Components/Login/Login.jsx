import React from 'react'
import { auth, provider } from '../../firebase/firebase';
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
function Login() {
  // throw new Error('kolla')
  const navigate = useNavigate()
// login function
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            navigate('/')
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user.displayName+" signed in");
            // IdP data available using getAdditionalUserInfo(result)
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
}
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-6 ">
          <button onClick={signInWithGoogle} className='btn btn-success'>Sign In with Google</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login