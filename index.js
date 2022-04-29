import express from 'express'
import ejs from "ejs"
import bodyParser from "body-parser"
import {FirebaseApp, db, User, review} from "./config.js"
import multer from "multer"
import path from "path"
import _ from "lodash"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDoc, getDocs, query,doc,updateDoc } from "firebase/firestore"; 
import { async } from '@firebase/util'
import {read, searchData, updateData, readReviews} from "./config.js"
import { writeUserData, reviewsDatabase } from './realtime.js'
import {getData} from "./realtime.js"
const app = express();  
let dataThelewala = ["hello","hi"]
let realData = []
let reviewsData = []
app.set('view engine','ejs')

var userName;
const storage = multer.diskStorage({
    destination:(req,file, cb) =>{
        cb(null,'uploads')
    },
    filename : (req,file,cb) =>{
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname) )
    } 

})
const upload = multer({storage: storage})

const __dirname = path.resolve();
app.use(bodyParser.urlencoded({ extended: true }))



app.use(express.static("public"))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


const auth = getAuth();
const newEmailLogin = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    return 1    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return 0
  });
} 

async function retrieveData (){
    dataThelewala = await read();
    realData = await getData();
    reviewsData = await readReviews();
    // console.log(reviewsData);
    // const json = JSON.parse(realData)
    // console.log(realData);
}
retrieveData()



app.get("/home",(req,res)=>{
    let randomData = [],a,b,c,d,e,f
    let reviewsArray = []

    while(a==b && b==c && a==c){
        a = Math.floor(Math.random()*(dataThelewala.length));
        b = Math.floor(Math.random()*(dataThelewala.length));
        c = Math.floor(Math.random()*(dataThelewala.length));
    }
    while(d==e && e==f && d==f){
        d = Math.floor(Math.random()*(reviewsData.length));
        e = Math.floor(Math.random()*(reviewsData.length));
        f = Math.floor(Math.random()*(reviewsData.length));
    }
    randomData.push(dataThelewala[a]);
    randomData.push(dataThelewala[b]);
    randomData.push(dataThelewala[c]);
    reviewsArray.push(reviewsData[d])
    reviewsArray.push(reviewsData[e])
    reviewsArray.push(reviewsData[f])
    // console.log(randomData[0].id);
     res.render("final",{newListItems: randomData, reviews:reviewsArray})
})


app.post("/:newUser",upload.single("image"),async (req, res) => {
    var name, email, password;    //users Details
    var reviews, number_thelewala, name_thelewala  //variables used for reviews system
    var newName,newEmail,newPassword;
    var like_name, like_number;
    var thele_name,thele_url,thele_num,thele_area,thele_reviews,thele_category,thele_star,thele_image;  //Thelewala Details
    var redirect = _.capitalize(req.params.newUser)
    if (redirect == "Newuser") {
        newName = req.body.newName;
        newEmail = req.body.newEmail;
        newPassword = req.body.newPassword;
        // if(newEmailLogin(email,password)){
        //     res.sendFile(__dirname + "/final.html")
        // }
        // else{
        //     res.sendFile(__dirname + "/index.html")
        // }
        newEmailLogin(newEmail,newPassword)
        res.sendFile(__dirname + "/index.html")

        
    }
    else if (redirect == "Home") {
        let randomData = []
        let reviewsArray = []

        email = req.body.email;
        userName = email;
        password = req.body.password;
        signInWithEmailAndPassword(auth, email, password)    //authenticating the user while they are signing in
        .then((userCredential) => {
          const user = userCredential.user;
          
          for(var i=0;i<3;i++){
            let n = Math.floor(Math.random()*(dataThelewala.length)) 
            let p = Math.floor(Math.random()*(reviewsData.length)) 
            reviewsArray.push(reviewsData[p])
            randomData.push(dataThelewala[n])
            }
         res.render("final",{newListItems: randomData,reviews: reviewsArray})
        console.log('Correct')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          res.sendFile(__dirname + "/index.html")
          console.log(error)
        });
      
            
  
    }
    else if(redirect == "Newthelewala"){
        res.sendFile(__dirname + "/add-new.html")
    }
    else if(redirect == "Addnewthelewala"){
        let randomData = [],n,a,b,c;
        
        thele_name = req.body.newThelewala;
        thele_num = req.body.newNumber;
        thele_area = req.body.areaName;
        thele_url = req.body.newURL;
        thele_reviews = req.body.reviews;
        thele_category = req.body.category;
        thele_star = req.body.starAns
        thele_image = req.body.imageURL
        console.log(auth.currentUser.email);
       addDoc(collection(db, "users"), {
                  name: thele_name,
                  number: thele_num,
                  area: thele_area,
                  image: thele_image,
                  url: thele_url,
                  likes:0,
                  reviews : thele_reviews,
                  category : thele_category,
                  user:auth.currentUser.email,
                  star:thele_star
                });
        // await writeUserData(userName, thele_name,thele_num,thele_area,thele_url,thele_reviews,thele_category,thele_star)
        //     console.log("Document Added");


            // for(var i=0;i<3;i++){
            //     while(!randomData.includes(dataThelewala)){
            //         n = Math.floor(Math.random()*(dataThelewala.length)) 
            //         randomData.push(dataThelewala[n])
            //     }
                
            //  }
            res.redirect("/home")
       
    }
    else if(redirect == "Search"){
       let searchArray = []
        let search = req.body.searchData;
        // console.log(search);
        searchArray = await searchData(search)
        // res.send(searchArray)
        res.render("search",{newListItems: searchArray})
            
            // thelewalaDetails = await getData()
            // res.send(realData)
    }

    else if(redirect == "Addreviews"){
        // res.send("Hello")
        number_thelewala = req.body.thelewalaNumber
        name_thelewala = req.body.nameThelewala
        // console.log(number_thelewala);
        // console.log(name_thelewala);
        res.render("reviews",{nameThelewala: name_thelewala, name: name_thelewala, number: number_thelewala})
    }
    else if(redirect == "Homepage"){
        reviews = req.body.reviews
        var name = req.body.name
        var number = req.body.number
        var star = req.body.starAns
        addDoc(collection(db, "reviews"), {
            // user: userName,
            name: name,
            number: number,
            reviews: reviews,
            user: auth.currentUser.email,
            stars: star
        });
        // await reviewsDatabase(userName,name_thelewala,number_thelewala)
        console.log("Added");
        res.redirect("/home")
    }
    else if(redirect == "Liked"){
        console.log("hello");
        like_name = req.body.nameThelewala
        like_number = req.body.thelewalaNumber

        updateData(like_number)
        res.redirect("/home")
        // const updateThelewala = doc(db, "users", like_number);

        // await updateDoc(updateThelewala, {
        // count_like: count_like+1
        // });
        
        // res.redirect("/home")
    }
})


    app.listen("5000", () => {
        console.log("3000 is running");
    })