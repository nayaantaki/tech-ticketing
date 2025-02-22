import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"

const itCode = "techsquad"

const firebaseConfig = {
  apiKey: "AIzaSyAhZCxTbHaCTsyTprl8iplCn1cyIPWGwc8",
  authDomain: "ticketing-31b16.firebaseapp.com",
  projectId: "ticketing-31b16",
  storageBucket: "ticketing-31b16.firebasestorage.app",
  messagingSenderId: "295758897849",
  appId: "1:295758897849:web:617dc8fc660741ad153168"
}

let itStaff = false
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const ticketCollection = collection(db, 'tickets')

// console.log(auth)

const loginScreen = document.getElementById("existing-login")
const loginEmailInputEl = document.getElementById("user-email")
const loginPasswordInputEl = document.getElementById("user-password")
const createAccountScreen = document.getElementById("create-account")
const createAccountPageBtn = document.getElementById("create-account-view-btn")
const loginExistingAccountPageBtn = document.getElementById("login-view-btn")
const loginBtnEl = document.getElementById("login-submit-btn")

const newUserEmail = document.getElementById("new-user-email")
const newUserPassword = document.getElementById("new-user-password")
const newUserItCode = document.getElementById("new-user-itcode")
const createAccountSubmitBtn = document.getElementById("create-account-submit-btn")

const accountCreationLandingPage = document.getElementById("initial-login")
const firstNameInputEl = document.getElementById("first-name-input-el")
const lastNameInputEl = document.getElementById("last-name-input-el")
const genPositionSelector = document.getElementById("position-select-gen-el")
const itPositionSelector = document.getElementById("position-select-it-el")
const landingPageSubmitBtn = document.getElementById("submit-landing-page-info")

const loggedInSectionEl = document.getElementById("logged-in-section")
const ticketInputTextEl = document.getElementById("ticket-data-input")
const ticketSubmissionBtn = document.getElementById("ticket-submit-btn")
const ticketTable = document.getElementById("ticket-table-el")

createAccountPageBtn.addEventListener("click", viewAccountCreation)
loginExistingAccountPageBtn.addEventListener("click", viewLogin)
createAccountSubmitBtn.addEventListener("click", authCreateAccountWithEmail)
loginBtnEl.addEventListener("click", authSignInWithEmail)
ticketSubmissionBtn.addEventListener("click", postTicketDocument)


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
            itStaff = true
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

function authSignInWithEmail() {
    const email = loginEmailInputEl.value
    const password = loginPasswordInputEl.value

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        viewLoggedIn()
        console.log("user logged in")
    })
    .catch((error) => {
        console.log(error.message)
    })
}

async function postTicketDocument() {
    let ticket = ticketInputTextEl.value
    let staff = getAuth().currentUser.email
    const docRef = await addDoc(collection(db, "tickets"), {
        staff: staff,
        ticket: ticket
    });
    console.log("your ticket has been posted")
}

async function fillTicketTable() {
    const querySnapshot = await getDocs(collection(db, "tickets"))
    querySnapshot.forEach((doc) => {
        console.log(doc.data())
        let tableRow = document.createElement("tr")
        let emailCell = document.createElement("th")
        emailCell.innerHTML = doc.staff //how to parse?
        let ticketData = document.createElement("th")
        ticketData.innerHTML = doc.ticket //how to parse?
        tableRow.appendChild(emailCell, ticketData)
        ticketTable.appendChild(tableRow)
        console.log("ticket inserted into table")
    })
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

function viewLoggedIn(){
    hideView(loginScreen)
    showView(loggedInSectionEl)
    fillTicketTable()
}

function showView(view) {
    view.style.display = "flex"
}
  
function hideView(view) {
    view.style.display = "none"
}