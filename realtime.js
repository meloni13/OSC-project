import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmJkzz3OjjRsu3pPX8DoC232QhSuHYCvQ",
  authDomain: "dawatee-khazanee.firebaseapp.com",
  projectId: "dawatee-khazanee",
  storageBucket: "dawatee-khazanee.appspot.com",
  messagingSenderId: "896486057906",
  appId: "1:896486057906:web:c444e5441b19da524b26ab",
  measurementId: "G-TSQEEHX8G0",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export async function writeUserData(user_name,
  thele_name,
  thele_num,
  thele_areaName,
  thele_newURL,
  thele_reviews,
  thele_category,
  thele_star
) {
  const db = getDatabase();
  await set(ref(db, "thelewalas/" + thele_name), {
    user: user_name,
    name: thele_name,
    number: thele_num,
    area: thele_areaName,
    url: thele_newURL,
    reviews: thele_reviews,
    category: thele_category,
    count_likes: 0,
    star: thele_star
  });
}

export async function reviewsDatabase(user,name,number){
  const db = getDatabase();
  await set(ref(db, "reviews/" + name), {
    user: user,
    name: name,
    number: number,
    count_likes:0
  });
}

export async function getData(){
  var dataThelewala = []
  const dbRef = ref(getDatabase());
  const snapshot = await get(child(dbRef, "thelewalas"))
  if (snapshot.exists()) {
    dataThelewala = snapshot.val()
    // console.log(dataThelewala);
    return dataThelewala
    // console.log(dataThelewala);
  } else {
    console.log("No data available");
  }
}


