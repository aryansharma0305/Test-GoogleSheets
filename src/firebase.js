// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider , RecaptchaVerifier} from "firebase/auth"

// Your web app's Firebase configuration


const firebaseConfig = {
 apiKey: "AIzaSyBehlinbFiQ7DFJnr6Y2Mq7m_3wttpjh48",
  authDomain: "upsplit-2199c.firebaseapp.com",
  projectId: "upsplit-2199c",
  storageBucket: "upsplit-2199c.firebasestorage.app",
  messagingSenderId: "983827747808",
  appId: "1:983827747808:web:972e95f6dfbb0e23989185"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
provider.addScope("https://www.googleapis.com/auth/drive.readonly");
provider.addScope("https://www.googleapis.com/auth/spreadsheets");


// export const storage = getStorage(app);
// export const db = getFirestore(app);

// export {RecaptchaVerifier}