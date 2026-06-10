const form =
document.getElementById("authForm");

const title =
document.getElementById("title");

const nameInput =
document.getElementById("name");

const email =
document.getElementById("email");

const password =
document.getElementById("password");

const submit =
document.getElementById("submitBtn");

const message =
document.getElementById("message");

const registerBtn =
document.getElementById("registerBtn");

const loginBtn =
document.getElementById("loginBtn");

let isLogin = false;



registerBtn.onclick = () => {

isLogin = false;

title.innerText =
"Create Account";

nameInput.style.display =
"block";

submit.innerText =
"Register";

registerBtn.classList.add(
"active"
);

loginBtn.classList.remove(
"active"
);

};



loginBtn.onclick = () => {

isLogin = true;

title.innerText =
"Login";

nameInput.style.display =
"none";

submit.innerText =
"Login";

loginBtn.classList.add(
"active"
);

registerBtn.classList.remove(
"active"
);

};



form.addEventListener(
"submit",

async (e)=>{

e.preventDefault();

message.innerText="";

const data={

email:
email.value,

password:
password.value

};

if(!isLogin){

data.name=
nameInput.value;

}

const endpoint=
isLogin
?

"http://localhost:5000/api/auth/login" 

:

"http://localhost:5000/api/auth/register";

try{

const response =
await fetch(endpoint,{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify(data)

}

);

const result =
await response.json();



if(response.ok){

if(isLogin){

localStorage.setItem(

"token",

result.token

);

window.location.href=
"index.html";

}

else{

message.innerText=
"Registered Successfully";

loginBtn.click();

}

}

else{

message.innerText=
result.message;

}

}

catch{

message.innerText=
"Server Error";

}

}

);