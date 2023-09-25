var loginstatus=JSON.parse(localStorage.getItem("loginstatus"));
if(loginstatus != "logedin"){
    location.href="index.html";
}
else{

var filtercheckbox=document.querySelectorAll('input[type="checkbox"]');
var tablebody=document.getElementById("orders-tableBody");

document.getElementById("ordersTag").style.color = "#20b883" ;
document.getElementById("productsTag").style.color= "rgba(0,0,0,.8)";
document.getElementById("usersTag").style.color= "rgba(0,0,0,.8)";

var xhttp= new XMLHttpRequest();
xhttp.open("GET","https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders",true);
xhttp.onreadystatechange=function(){
    if(this.readyState==4){
        var orders = JSON.parse(this.responseText);
        console.log(orders);

            var count =0;
            for(let i=0;i<orders.length;i++){
                count++;
                tablebody.innerHTML+=`
                 <tr class="orders-TableRow">
                     <td class="orders-id">${orders[i].id}</td>
                     <td class="orders-customer">${orders[i].customerName}</td>
                     <td class="orders-date">${orders[i].orderDate} <br>
                         <span class="orders-time">${orders[i].orderTime}</span>
                     </td>
                     <td class="orders-amount">$ ${orders[i].amount}</td>
                     <td class="orders-status">${orders[i].orderStatus}</td>
                 </tr>`
            }
            document.getElementById("orders-count").innerHTML=`${count}`;

        for(let i=0;i<filtercheckbox.length;i++){
            filtercheckbox[i].addEventListener("change",function(e){
                e.stopPropagation();
                // console.log(this.checked);
                tablebody.innerHTML=""
                console.log(tablebody.innerHTML);
                //for selecting checked checkboxes
                var checkedCheckbox=document.querySelectorAll("input:checked");

                var count =0;
                for(let i=0;i<orders.length;i++){
                    for(let j=0;j<checkedCheckbox.length;j++){
                        if(orders[i].orderStatus==checkedCheckbox[j].name){
                            count++;
                            tablebody.innerHTML+=`
                            <tr class="orders-TableRow">
                                <td class="orders-id">${orders[i].id}</td>
                                <td class="orders-customer">${orders[i].customerName}</td>
                                <td class="orders-date">${orders[i].orderDate} <br>
                                    <span class="orders-time">${orders[i].orderTime}</span>
                                </td>
                                <td class="orders-amount">$ ${orders[i].amount}</td>
                                <td class="orders-status">${orders[i].orderStatus}</td>
                            </tr>`
                        }
                    }
                }
                document.getElementById("orders-count").innerHTML=`${count}`;
                
            })
        }
    }
}
xhttp.send();
}

var logoutbutton=document.getElementById("right-side");
logoutbutton.addEventListener("click",function(){
    localStorage.removeItem("loginstatus");
    location.href="index.html";
})