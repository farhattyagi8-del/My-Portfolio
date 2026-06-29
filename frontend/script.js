window.addEventListener(
"DOMContentLoaded",
()=>{

const popup =
document.getElementById("authPopup");

const close =document.getElementById("closePopup");

const success =
document.getElementById(
"successMessage");
if(!popup) return;

// GOOGLE LOGIN HANDLE


const urlParams =
new URLSearchParams(
window.location.search
);

const googleToken =
urlParams.get("token");

const googleLogin =
urlParams.get("login");

if(
googleToken &&
googleLogin === "success") {
sessionStorage.setItem(
"token",googleToken);

sessionStorage.setItem(
"showGoogleSuccess","true");

// remove token from URL
window.history.replaceState(
{},
document.title,window.location.pathname);

}

// NORMAL LOGIN HANDLE


const token =
sessionStorage.getItem("token");

const showSuccess = sessionStorage.getItem("showLoginSuccess");

const showGoogleSuccess =sessionStorage.getItem("showGoogleSuccess");

// USER NOT LOGGED IN


if(!token){
popup.style.display ="flex";

if(success){
success.innerText ="";
}

}

// LOGIN SUCCESS POPUP


else if(
showSuccess ||
showGoogleSuccess
){

popup.style.display = "flex";
if(success){

success.innerText =
showGoogleSuccess ?"🎉 Google login completed successfully":"🎉 Login completed successfully";}

sessionStorage.removeItem("showLoginSuccess");

sessionStorage.removeItem("showGoogleSuccess");


// auto close

setTimeout(()=>{
popup.style.display ="none";},2500);

}

// ALREADY LOGGED IN


else{

popup.style.display =
"none";

}

// CLOSE BUTTON


close?.addEventListener("click",

()=>{
popup.style.display =
"none";

});

});
