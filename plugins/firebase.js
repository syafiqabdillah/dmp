import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

export default ({ env, store }, inject) => {
  const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
  }

  if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
  }

  inject('firebase', firebase)
}
