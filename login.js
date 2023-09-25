var loginstatus=JSON.parse(localStorage.getItem("loginstatus"));
console.log(loginstatus);

if(loginstatus == "logedin"){
    location.href="orders.html";
}

var username = document.getElementById("username");
var password = document.getElementById("password");
var loginButton =document.getElementById("login-btn");

loginButton.addEventListener("click",function(e){
    if(username.value === password.value){
        localStorage.setItem("loginstatus",JSON.stringify("logedin"));
        alert("Login successfull")
        location.href="orders.html";
    }
    else if(username.value != password.value){
        alert("invalid username or password")
    }
    
    e.preventDefault();
})