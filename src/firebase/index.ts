// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDmFYs8WvduiBFZHc63k31W0AroFIUeCuQ",
  authDomain: "admin-panel-6a07a.firebaseapp.com",
  projectId: "admin-panel-6a07a",
  storageBucket: "admin-panel-6a07a.appspot.com",
  messagingSenderId: "1031892149768",
  appId: "1:1031892149768:web:df2a9b56e9d910139413bd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

