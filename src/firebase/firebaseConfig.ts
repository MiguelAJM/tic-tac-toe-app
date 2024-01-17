import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAUuec1XGxpx4LGSzRdBEixtxxU-W88g64',
  authDomain: 'tic-tac-toe-app-ef792.firebaseapp.com',
  projectId: 'tic-tac-toe-app-ef792',
  storageBucket: 'tic-tac-toe-app-ef792.appspot.com',
  messagingSenderId: '839137228553',
  appId: '1:839137228553:web:11d43e98da767e61e345d8'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
