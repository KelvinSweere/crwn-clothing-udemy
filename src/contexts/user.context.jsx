import { createContext, useState, useEffect, useReducer } from "react";

import { createUserDocumentFromAuth, onAuthStateChangedListner } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

const USER_ACTION_TYPER = {
 SET_CURRENT_USER:  'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
  console.log(action);
  const {type, payload} = action;

  switch(type) {
    case USER_ACTION_TYPER.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      throw new Error(`unhandled type ${type}`);
  }
}

const INITIAL_STATE = {
  currentUser: null
}

export const UserProvider = ({ children }) => {
  const [{currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
  
  console.log(currentUser);

  const setCurrentUser = (user) => {
    console.log('dispatch');
    dispatch({type: USER_ACTION_TYPER.SET_CURRENT_USER, payload: user})
  }
  
  
  const value = { currentUser, setCurrentUser};

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
      if(user){
        createUserDocumentFromAuth(user);
      }
    })
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>

};