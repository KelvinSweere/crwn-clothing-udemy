// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth, 
  signInWithRedirect,
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjPTW4bsEa6gGZEPuMYbprOXJ7FC4A4O4",
  authDomain: "crwn-clothing-web-app-a3e0f.firebaseapp.com",
  projectId: "crwn-clothing-web-app-a3e0f",
  storageBucket: "crwn-clothing-web-app-a3e0f.appspot.com",
  messagingSenderId: "683432530616",
  appId: "1:683432530616:web:7f721f6855ea9c730f9a4d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach(async (object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'category');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
}

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
  ) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  if(!userSnapShot.exists()) {
    const {displayName, email} = userAuth;
    const createAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInformation
      });
    }
    catch (error){
      console.log('error creating the user ', error.message);
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback);