import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
const itCode = "techsquad"

const firebaseConfig = {
  apiKey: "AIzaSyAhZCxTbHaCTsyTprl8iplCn1cyIPWGwc8",
  authDomain: "ticketing-31b16.firebaseapp.com",
  projectId: "ticketing-31b16",
  storageBucket: "ticketing-31b16.firebasestorage.app",
  messagingSenderId: "295758897849",
  appId: "1:295758897849:web:617dc8fc660741ad153168"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const usersCollectionRef = collection(db, 'users') //double check the collection id

// console.log(auth)

const loginScreen = document.getElementById("existing-login")
const createAccountScreen = document.getElementById("create-account")
const createAccountPageBtn = document.getElementById("create-account-view-btn")
const loginExistingAccountPageBtn = document.getElementById("login-view-btn")

const newUserEmail = document.getElementById("new-user-email")
const newUserPassword = document.getElementById("new-user-password")
const newUserItCode = document.getElementById("new-user-itcode")
const createAccountSubmitBtn = document.getElementById("create-account-submit-btn")

const accountCreationLandingPage = document.getElementById("initial-login")
const genPositionSelector = document.getElementById("position-select-gen-el")
const itPositionSelector = document.getElementById("position-select-it-el")
const landingPageSubmitBtn = document.getElementById("submit-landing-page-info")

createAccountPageBtn.addEventListener("click", viewAccountCreation)
loginExistingAccountPageBtn.addEventListener("click", viewLogin)
createAccountSubmitBtn.addEventListener("click", authCreateAccountWithEmail)


viewLogin()

/**********************************************************************
* FIREBASE FUNCTIONS
***********************************************************************/

function authCreateAccountWithEmail() {
    console.log("Sign up with email and password")
    
    const email = newUserEmail.value
    const password = newUserPassword.value
    const givenItCode = newUserItCode.value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        if (givenItCode == itCode){
            hideView(genPositionSelector)
            showView(itPositionSelector) 
        } else {
            hideView(itPositionSelector) 
            showView(genPositionSelector)
        }
        viewAccountCreationLanding()
        console.log("success!")
  })
    .catch((error) => {
        console.error(error.message)
  });
}

/**********************************************************************
* VIEW VISIBILITY FUNCTIONS
***********************************************************************/

function viewAccountCreation(){
    hideView(loginScreen)
    showView(createAccountScreen)
}

function viewLogin(){
    hideView(createAccountScreen)
    showView(loginScreen)
}

function viewAccountCreationLanding(){
    hideView(createAccountScreen)
    showView(accountCreationLandingPage)
}

function showView(view) {
    view.style.display = "flex"
}
  
function hideView(view) {
    view.style.display = "none"
}