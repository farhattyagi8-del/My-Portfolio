// Handle Google OAuth callback
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');
const error = urlParams.get('error');


console.log('Auth page loaded with token:', !!token, 'error:', error); 

if (error) {
  console.error('Login error:', error);
  alert('Google login failed: ' + decodeURIComponent(error));
}

if (token) {
  console.log('Token found, saving to localStorage and redirecting...');
  // localStorage.setItem('token', token);
  //  localStorage.setItem('loggedIn', 'true' )  
   sessionStorage.setItem("token", token);
   
   sessionStorage.setItem("showLoginSuccess", "true");
  //  window.location.href = "index.html"; }

  const redirectUrl = window.location.origin + '/index.html';
  console.log('Redirecting to:', redirectUrl);
  // Use setTimeout to ensure localStorage is written
  setTimeout(() => {
    window.location.href = redirectUrl;
  }, 100);
} else {
  console.log('No token in URL, showing auth form');
  
}

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

const otp = document.getElementById('otp');

const submit =
document.getElementById("submitBtn");

const message =
document.getElementById("message");

const registerBtn =
document.getElementById("registerBtn");

const loginBtn =
document.getElementById("loginBtn");

const googleBtn =
document.getElementById("googleBtn");

let isLogin = false;
let isOtpStep = false;

otp.style.display = "none";


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
isOtpStep = false;

otp.style.display = "none";

title.innerText ="Login";

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

if(isOtpStep){

  // try{

  // }

  // catch{
  //   message.innerText = "OTP verification failed"
  // }

const response =
await fetch(

"http://127.0.0.1:5000/api/auth/verify-otp",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:
JSON.stringify({

email:
email.value,

otp:
otp.value

})

}

);

const result =
await response.json();

message.innerText =
result.message;

if(response.ok){

email.disabled = false;

password.disabled = false;

nameInput.disabled = false;

otp.style.disabled = "none";

submit.innerText =
"Login";

isOtpStep =
false;

loginBtn.click();

}

return;

}

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
"http://127.0.0.1:5000/api/auth/login"

:

"http://127.0.0.1:5000/api/auth/register" ;

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

sessionStorage.setItem(

"token",

result.token

);

sessionStorage.setItem('showLoginSuccess', 'true');

window.location.href= 'index.html';

}

else{

// message.innerText=
// "Registered Successfully";

message.innerText = "OTP sent to  your email";

email.disabled = true;
password.disabled = true;
nameInput.disabled = true;
otp.style.display = "block";
submit.innerText = "Verify OTP";
isOtpStep = true;
// loginBtn.click();

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

googleBtn.onclick = () => {
  console.log('Google button clicked, redirecting to OAuth...');
   window.location.href = 'https://my-portfolio-la7j.onrender.com/api/auth/google/callback';
};