import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-5521d.firebaseapp.com",
  projectId: "blog-5521d",
  storageBucket: "blog-5521d.appspot.com",
  messagingSenderId: "934030855960",
  appId: "1:934030855960:web:0ea6940371d2fef872d86d",
  measurementId: "G-CSRSR5RMHJ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
export {app,auth,provider}