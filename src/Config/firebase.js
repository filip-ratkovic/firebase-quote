
import firebase from 'firebase/compat/app';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendPasswordResetEmail, 
  signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword} from "firebase/auth"
import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";
import { store } from "../Store/store";
import { authSlice } from "../Store/authSlice";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = firebase.initializeApp(firebaseConfig);


// SIGN UP 
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const signUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  store.dispatch(
    authSlice.actions.setData({
      id: user.uid,
      email: user.email,
      token: user.accessToken,
    })
  );

  return user;
};

export  const signInWithGoogle = async () => {
  try {
     const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user
    store.dispatch(
      authSlice.actions.setData({
        id: user.uid,
        email: user.email,
        token: user.accessToken,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    store.dispatch(authSlice.actions.logout());
  } catch (error) {
    console.log(error);
  }
};

//  PASSWORD
export const resetPassword = async (email) => {
   await sendPasswordResetEmail(auth, email)
}

export const updateNewPassword = async(newPassword) => {
    try{ 
      await updatePassword(newPassword);
   
    } catch(error) {
      alert(error.message)
    }
}
// LOGIN 
export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  store.dispatch(
    authSlice.actions.setData({
      id: user.uid,
      email: user.email,
      token: user.accessToken,
    })
  );

  return user
}

// FETCH DATA 
export const db = getFirestore(app);

export const getQuotes = async () => {
    const quotesCollection = collection(db, "quotes");
    const quoteResults = await getDocs(quotesCollection);
    const quoteList = quoteResults.docs.map((doc) => ({...doc.data(), id : doc.id}));
    return quoteList;
  };
  
  export const addQuote = async (data) => {
    const result = await addDoc(collection(db, "quotes"), data);
    return result;
  };

  export const deleteQuote = async (id) => {
    const docRef = doc(db, "quotes", id);
    return await deleteDoc(docRef)
  }

  export const likeQuote = async (id, likes) => {
    const docRef = doc(db, "quotes", id);
    return await updateDoc(docRef, { likes: likes });
  };
  export const isLiked = async (id, Isliked) => {
    const docRef = doc(db, "quotes", id);
    return await updateDoc(docRef, { Isliked: Isliked });
  };
  
  export const updateQuoteData = async (id, data) => {
    const docRef = doc(db, "quotes", id);
    return await updateDoc(docRef, data);
  };

  export const getQuoteById = async (id) => {
    const docRef = doc(db, "quotes", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return { ...data, id: id };
  };