// إعداد الاتصال بـ Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCb9qGugd8ZV22QITB_RkKD65JKKA7eCi0",
  authDomain: "iill-1cb64.firebaseapp.com",
  projectId: "iill-1cb64",
  storageBucket: "iill-1cb64.appspot.com",
  messagingSenderId: "624347877469",
  appId: "1:624347877469:web:4f3c11781e4951e5233db4",
  measurementId: "G-83FT8F99Z6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
