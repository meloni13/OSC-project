
import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore, where,query, increment}  from "firebase/firestore";
import { format } from 'path';
import {doc,updateDoc} from "firebase/firestore"
import { Database } from 'firebase/database';
// import {getDatabase

const firebaseConfig = {
    apiKey: "AIzaSyCmJkzz3OjjRsu3pPX8DoC232QhSuHYCvQ",
    authDomain: "dawatee-khazanee.firebaseapp.com",
    projectId: "dawatee-khazanee",
    storageBucket: "dawatee-khazanee.appspot.com",
    messagingSenderId: "896486057906",
    appId: "1:896486057906:web:c444e5441b19da524b26ab",
    measurementId: "G-TSQEEHX8G0"
  };


  export const FirebaseApp = initializeApp(firebaseConfig)
  export const db = getFirestore(FirebaseApp)
  // db.setting({time})
  // export const colref = collection(db,'users')
  export const User = collection(db,"users")
  export const review = collection(db,"reviews")
 export async function read(){
      const querySnapshot = await getDocs(collection(db,'users'), );
      // querySnapshot.forEach((obj)=>{console.log(obj.data())});
      return querySnapshot.docs.map((obj)=>{return obj.data()});

    }

  export async function readReviews(){
    const querySnapshot = await getDocs(collection(db,'reviews'), );
      // querySnapshot.forEach((obj)=>{console.log(obj.data())});
      return querySnapshot.docs.map((obj)=>{return obj.data()});
  }

    export async function searchData(dataType){
      // const querySnapshot = await getDocs(collection(db,'users'), where("category","==",dataType));
      // querySnapshot.forEach((obj)=>{console.log(obj.data())});
      // // return querySnapshot.docs.map((obj)=>{return obj.data()});
      const q = query(collection(db, "users"), where("category", "==", dataType));
      const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {console.log(doc.data())});
      return querySnapshot.docs.map((obj)=>{return obj.data()});
    }

    export async function updateData(thelewalaNumber){
      const q = query(collection(db, "users"), where("number", "==", thelewalaNumber));
      const querySnapshot = await getDocs(q);
      const docID = querySnapshot.docs[0].ref.id;
      console.log(docID);

      const ref = doc(db, "users", docID)

      await updateDoc(ref, {
        likes : increment(1)
      })


    }
    

