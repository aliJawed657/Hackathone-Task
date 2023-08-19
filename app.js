import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { collection, addDoc, getFirestore ,onSnapshot,deleteDoc,doc ,updateDoc} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBuZ-dIttrBigQPclC7sR_baVlQXQDqca4",
    authDomain: "hackathone-project-9b401.firebaseapp.com",
    projectId: "hackathone-project-9b401",
    storageBucket: "hackathone-project-9b401.appspot.com",
    messagingSenderId: "966795337639",
    appId: "1:966795337639:web:85e3dc6aa6f64f519aa082"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const ids= [];

const getData = ()=>{
    onSnapshot(collection(db,"user"),(data) =>{
        data.docChanges().forEach((user) =>{
            ids.push(user.doc.id)
            let dlt = document.getElementById(user.doc.id);
            if(dlt){
                dlt.remove()
            }else{

                
                            let list = document.getElementById("list")
                            list.innerHTML +=
                        `
                        <div id='${user.doc.id}'class="card mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                          <div class="col-md-8">
                            <div class="card-body">
                            <h5 class="card-text" >${user.doc.data().emailBtn}</h5>
                             <p  class="card-title">${user.doc.data().passwordBtn} <p/>
                              <p class="card-text"><small class="text-body-secondary">${new Date()}</small></p>
                              <button onclick="del('${user.doc.id}')">Delete</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    `
            }
            
        })
    })
}
getData()


let btn = document.getElementById("login-btn");

btn && btn.addEventListener("click", (e) => {
    e.preventDefault()

    location.pathname = "login.html"
});

let signup = document.getElementById("signup");

signup && signup.addEventListener("click", async (e) => {
    e.preventDefault()
    let fName = document.getElementById("fName");
    let lName = document.getElementById("lName");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    const auth = getAuth();


    try {
        const docRef = await addDoc(collection(db, "users"), {
            fName: fName.value,
            lastNAme: lName.value,
            email: email.value,
            password: password.value
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    console.log(email.value);
    console.log(password.value)
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("USER", user)
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log("ERROR", errorMessage)
        });
    location.pathname = "login.html"
})
let login = document.getElementById("login");

login && login.addEventListener("click", (e) => {
    e.preventDefault()
    let email = document.getElementById("email")
    let password = document.getElementById("password")

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Succes")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
        location.pathname = "dashboard.html"
})

let passwordBtn = document.getElementById("passwordBtn");
let emailBtn = document.getElementById("emailBtn");
let publisBtn = document.getElementById("publishBtn");

publisBtn.addEventListener("click", async() => {
    // console.log(passwordBtn.value, emailBtn.value)
    let passwordBtn = document.getElementById("passwordBtn");
    let emailBtn = document.getElementById("emailBtn");
    let list = document.getElementById("list");
    try {
        const docRef = await addDoc(collection(db, "user"), {
          passwordBtn : passwordBtn.value,
          emailBtn : emailBtn.value,

        });
    
        console.log("success");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    
})



 async function del(id){
    await deleteDoc(doc(db, "user", id));
    console.log("Todo deleted")

}
window.del=del