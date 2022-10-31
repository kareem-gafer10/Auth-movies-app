import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEC5BiZnUpYpRWsafnkkiXS9iktsZ4H0w",
  authDomain: "rctmovieapp-95823.firebaseapp.com",
  projectId: "rctmovieapp-95823",
  storageBucket: "rctmovieapp-95823.appspot.com",
  messagingSenderId: "113889207314",
  appId: "1:113889207314:web:b875e1dc81087a852ea4cb",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const registerUser = async (email, password, displayName) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName });
  } catch (err) {
    return err.message.replace("Firebase:", "");
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);
  } catch (err) {
    return err.message.replace("Firebase:", "");
  }
};

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });
};

export const logout = () => {
  signOut(auth);
};

// login with Google

export const signupProvider = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

// forget password

export const forgetPassword = async(email)=>{
  try {
    await sendPasswordResetEmail(auth,email)
    return ("Please check your Email Box")
   
  } catch (err) {
    return err.message.replace("Firebase:", "");
  }

}