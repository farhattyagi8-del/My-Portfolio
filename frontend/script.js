window.addEventListener(
"DOMContentLoaded",
()=>{

const popup =
document.getElementById(
"authPopup"
);

const close =
document.getElementById(
"closePopup"
);

const success =
document.getElementById(
"successMessage"
);

if(!popup) return;


// =======================
// GOOGLE LOGIN HANDLE
// =======================

const urlParams =
new URLSearchParams(
window.location.search
);

const googleToken =
urlParams.get(
"token"
);

const googleLogin =
urlParams.get(
"login"
);

if(
googleToken &&
googleLogin === "success"
){

sessionStorage.setItem(
"token",
googleToken
);

sessionStorage.setItem(
"showGoogleSuccess",
"true"
);

// remove token from URL
window.history.replaceState(
{},
document.title,
window.location.pathname
);

}


// =======================
// NORMAL LOGIN HANDLE
// =======================

const token =
sessionStorage.getItem(
"token"
);

const showSuccess =
sessionStorage.getItem(
"showLoginSuccess"
);

const showGoogleSuccess =
sessionStorage.getItem(
"showGoogleSuccess"
);


// =======================
// USER NOT LOGGED IN
// =======================

if(!token){

popup.style.display =
"flex";

if(success){

success.innerText =
"";

}

}


// =======================
// LOGIN SUCCESS POPUP
// =======================

else if(
showSuccess ||
showGoogleSuccess
){

popup.style.display =
"flex";

if(success){

success.innerText =
showGoogleSuccess

?

"🎉 Google login completed successfully"

:

"🎉 Login completed successfully";

}

sessionStorage.removeItem(
"showLoginSuccess"
);

sessionStorage.removeItem(
"showGoogleSuccess"
);


// auto close

setTimeout(()=>{

popup.style.display =
"none";

},2500);

}


// =======================
// ALREADY LOGGED IN
// =======================

else{

popup.style.display =
"none";

}


// =======================
// CLOSE BUTTON
// =======================

close?.addEventListener(

"click",

()=>{

popup.style.display =
"none";

}

);

});


// window.addEventListener(
// "DOMContentLoaded",
// ()=>{

// const popup =
// document.getElementById(
// "authPopup"
// );

// const close =
// document.getElementById(
// "closePopup"
// );

// const success =
// document.getElementById(
// "successMessage"
// );

// if(!popup) return;

// const token =
// sessionStorage.getItem(
// "token"
// );

// const showSuccess =
// sessionStorage.getItem(
// "showLoginSuccess"
// );

// const showGoogleSuccess = sessionStorage.getItem("showGoogleSuccess");

// // USER NOT LOGGED IN
// if(!token){

// popup.style.display =
// "flex";

// if(success){

// success.innerText =
// "";

// }

// }

// // USER JUST LOGGED IN
// if(token && ( showSuccess || showGoogleSuccess )){

// popup.style.display =
// "flex";

// if(success){

// success.innerText = showGoogleSuccess ? " 🎉 Google Login completed Successfully" :
// "🎉 Login completed successfully";

// }

// sessionStorage.removeItem(
// "showLoginSuccess"
// );
 
// sessionStorage.removeItem(
// "showGoogleSuccess"
// );
// // auto close
// setTimeout(()=>{

// popup.style.display =
// "none";

// },2500);

// }

// // USER ALREADY LOGGED IN
// if(token && !showSuccess){

// popup.style.display =
// "none";

// }

// close?.addEventListener(
// "click",
// ()=>{

// popup.style.display =
// "none";

// });

// });


//  window.addEventListener(
// "DOMContentLoaded",
// ()=>{

// const popup =
// document.getElementById(
// "authPopup"
// );

// const close =
// document.getElementById(
// "closePopup"
// );

// const success =
// document.getElementById(
// "successMessage"
// );

// if(!popup) return;

// const token =
// sessionStorage.getItem(
// "token"
// );

// const showSuccess =
// sessionStorage.getItem(
// "showLoginSuccess"
// );

// if(!token){

// popup.style.display =
// "flex";

// if(success){

// success.innerText =
// "";

// }

// }

// else if(token && showSuccess){

// popup.style.display =
// "flex";

// if(success){

// success.innerText =
// "🎉 Login completed successfully";

// }

// sessionStorage.removeItem(
// "showLoginSuccess"
// );

// setTimeout(()=>{

// popup.style.display =
// "none";

// },2500);

// }

// else{

// popup.style.display =
// "none";

// }

// USER NOT LOGGED IN
// if(!token){

// popup.style.display =
// "flex";

// if(success){

// success.innerText =
// "";

// }

// }

// USER JUST LOGGED IN
// if(token && showSuccess){

// popup.style.display =
// "flex";

// if(success){

// success.innerText =
// "🎉 Login completed successfully";

// }

// sessionStorage.removeItem(
// "showLoginSuccess"
// );

// // auto close
// setTimeout(()=>{

// popup.style.display =
// "none";

// },2500);

// }


// USER ALREADY LOGGED IN
// if(token && !showSuccess){

// popup.style.display =
// "none";

// }

// close?.addEventListener(
// "click",
// ()=>{

// popup.style.display =
// "none";

// });

// });
// window.addEventListener(
// "DOMContentLoaded",
// ()=>{

// const popup =
// document.getElementById(
// "authPopup"
// );

// const close =
// document.getElementById(
// "closePopup"
// );

// const success =
// document.getElementById(
// "successMessage"
// );

// if(!popup) return;

// const token =
// sessionStorage.getItem(
// "token"
// );

// const showSuccess =
// sessionStorage.getItem(
// "showLoginSuccess"
// );

// // User already logged in
// if(token){
// popup.style.display = "flex";
// // sirf login ke turant baad
// if(showSuccess){

// popup.style.display =
// "flex";


// success.innerText =
// "🎉 Congratulations! Login completed successfully.";



// // dobara show na ho
// sessionStorage.removeItem(
// "showLoginSuccess"
// );

// setTimeout(() =>{
//     popup.style.display = "none";
// }, 2500);



// }

// else{

// popup.style.display =
// "flex";


// }
// }

// // close popup
// close?.addEventListener(
// "click",
// ()=>{

// popup.style.display =
// "none";

// });

// });
// window.addEventListener(
// "DOMContentLoaded",
// ()=>{

// const popup =
// document.getElementById(
// "authPopup"
// );

// const close =
// document.getElementById(
// "closePopup"
// );

// const success =
// document.getElementById(
// "successMessage"
// );

// if(!popup) return;

// const showSuccess =
// sessionStorage.getItem(
// "showLoginSuccess"
// );

// // user already login
// if(token){

// popup.style.display =
// "flex";

// if(showSuccess){

//     popup.style.display = "flex";

//     if(success){

// success.innerText =
// "🎉 Congratulations! Login completed successfully.";
//     }
// }


// sessionStorage.removeItem("showLoginSuccess");
// }
// }

// }else{

// popup.style.display =
// "flex";

// if(success){

// success.innerText =
// "";

// }

// }

// // close
// close?.addEventListener(
// "click",
// ()=>{

// popup.style.display =
// "none";

// });

// });
// window.addEventListener(
// "DOMContentLoaded",
// ()=>{

// const popup =
// document.getElementById(
// "authPopup"
// );

// const close =
// document.getElementById(
// "closePopup"
// );

// if(!popup) return;

// const loggedIn =
// localStorage.getItem(
// "loggedIn"
// );

// // login hua → popup hide
// if(
// loggedIn==="true"
// )
// document.getElementById("success-msg").innerText =  "🎉 Congratulation Login is successfull. ";

// if(loginSuccess){

// localStorage.setItem(
// "loggedIn",
// "true"
// );

// document.getElementById(
// "successMessage"
// ).innerText =
// "🎉 Congratulations! Login completed successfully.";

// }

// // login nahi → popup show


// // close
// close?.addEventListener(
// "click",
// ()=>{

// popup.style.display=
// "none";

// });

// })