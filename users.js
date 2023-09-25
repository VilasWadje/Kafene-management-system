var loginstatus=JSON.parse(localStorage.getItem("loginstatus"));
if(loginstatus != "logedin"){
    location.href="index.html";
}
else{

document.getElementById("ordersTag").style.color = "rgba(0,0,0,.8)" ;
document.getElementById("productsTag").style.color= "rgba(0,0,0,.8)" ;
document.getElementById("usersTag").style.color= "#20b883";


var tablebody=document.getElementById("orders-tableBody");

var xhttp= new XMLHttpRequest();
xhttp.open("GET","https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",true);
xhttp.onreadystatechange=function(){
    if(this.readyState==4){
        var users = JSON.parse(this.responseText);
        console.log(users);

        for(let i=0;i<users.length;i++){
            tablebody.innerHTML+=`
            <tr class="orders-TableRow">
                <td class="orders-id">${users[i].id}</td>
                <td class="product-Name"><img src="${users[i].profilePic}" alt="userphoto"></td>
                <td class="product-Brand">${users[i].fullName}</td>
                <td class="Expiry-date">${users[i].dob}</td>
                <td class="Unit-amount">${users[i].gender}</td>
                <td class="Unit-amount">${users[i].currentCity},${users[i].currentCountry}</td>
            </tr> 
             `
        }

        var searchInput=document.getElementById("search-input");
        var searchBtn=document.getElementById("search-btn");
        var resetBtn=document.getElementById("reset-btn");

        searchInput.addEventListener("keypress", function (e) {
            if (e.key == "Enter") {
                
                var inputvalue = searchInput.value.toLowerCase();
                if (inputvalue.length >= 2) {
                    tablebody.innerHTML = "";
                    for (let i = 0; i < users.length; i++) {
                        var fullName = users[i].fullName.toLowerCase();
                        if (fullName.includes(inputvalue)) {
                            tablebody.innerHTML += `
                                <tr class="orders-TableRow">
                                    <td class="orders-id">${users[i].id}</td>
                                    <td class="product-Name"><img src="${users[i].profilePic}" alt="userphoto"></td>
                                    <td class="product-Brand">${users[i].fullName}</td>
                                    <td class="Expiry-date">${users[i].dob}</td>
                                    <td class="Unit-amount">${users[i].gender}</td>
                                    <td class="Unit-amount">${users[i].currentCity},${users[i].currentCountry}</td>
                                </tr> 
                            `
                        }
                    }
                }else{
                    alert("please enter atLeast two characters")
                }
                e.preventDefault();
            }
            
        })
        searchBtn.addEventListener("click",function(e){
            var inputvalue = searchInput.value.toLowerCase();
                if (inputvalue.length >= 2) {
                    tablebody.innerHTML = "";
                    for (let i = 0; i < users.length; i++) {
                        var fullName = users[i].fullName.toLowerCase();
                        if (fullName.includes(inputvalue)) {
                            tablebody.innerHTML += `
                                <tr class="orders-TableRow">
                                    <td class="orders-id">${users[i].id}</td>
                                    <td class="product-Name"><img src="${users[i].profilePic}" alt="userphoto"></td>
                                    <td class="product-Brand">${users[i].fullName}</td>
                                    <td class="Expiry-date">${users[i].dob}</td>
                                    <td class="Unit-amount">${users[i].gender}</td>
                                    <td class="Unit-amount">${users[i].currentCity},${users[i].currentCountry}</td>
                                </tr> 
                            `
                        }
                    }
                }else{
                    alert("please enter atLeast two characters")
                }
                e.preventDefault();
        })
        resetBtn.addEventListener("click",function(){
            location.reload();
        })
    }
}
xhttp.send();

}

var logoutbutton=document.getElementById("right-side");
logoutbutton.addEventListener("click",function(){
    localStorage.removeItem("loginstatus");
    location.href="index.html";
})