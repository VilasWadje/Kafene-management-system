var loginstatus=JSON.parse(localStorage.getItem("loginstatus"));
if(loginstatus != "logedin"){
    location.href="index.html";
}
else{

document.getElementById("ordersTag").style.color = "rgba(0,0,0,.8)" ;
document.getElementById("productsTag").style.color= "#20b883";
document.getElementById("usersTag").style.color= "rgba(0,0,0,.8)";

var filtercheckbox=document.querySelectorAll('input[type="checkbox"]');
var tablebody=document.getElementById("orders-tableBody");

var xhttp= new XMLHttpRequest();
xhttp.open("GET","https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products",true);
xhttp.onreadystatechange=function(){
    if(this.readyState==4){
        var products = JSON.parse(this.responseText);
        console.log(products);

            var count =0;
            for(let i=0;i<products.length;i++){
                count++;
                tablebody.innerHTML+=`
                <tr class="orders-TableRow">
                    <td class="orders-id">${products[i].id}</td>
                    <td class="product-Name">${products[i].medicineName}</td>
                    <td class="product-Brand">${products[i].medicineBrand}</td>
                    <td class="Expiry-date">${products[i].expiryDate}</td>
                    <td class="Unit-amount">$ ${products[i].unitPrice}</td>
                    <td class="Stock">${products[i].stock}</td>
                </tr>
                `
            }
            //updating count
            document.getElementById("orders-count").innerHTML=`${count}`;

        for(let i=0;i<filtercheckbox.length;i++){
            filtercheckbox[i].addEventListener("change",function(e){
                e.stopPropagation();
                // console.log(this.name);
                tablebody.innerHTML=""
                // console.log(tablebody.innerHTML);
                //for selecting checked checkboxes
                var checkedCheckbox=document.querySelectorAll("input:checked");
                console.log(checkedCheckbox);
                var count =0;
                
                    if(checkedCheckbox.length==2){
                        for(let i=0;i<products.length;i++){
                            var expiryYear=products[i].expiryDate.slice(7,11);
                            // console.log(expiryYear);
                            if(products[i].stock < 100 || expiryYear < 2023){
                                count++;
                                tablebody.innerHTML+=`
                                <tr class="orders-TableRow">
                                    <td class="orders-id">${products[i].id}</td>
                                    <td class="product-Name">${products[i].medicineName}</td>
                                    <td class="product-Brand">${products[i].medicineBrand}</td>
                                    <td class="Expiry-date">${products[i].expiryDate}</td>
                                    <td class="Unit-amount">$ ${products[i].unitPrice}</td>
                                    <td class="Stock">${products[i].stock}</td>
                                </tr>
                                `
                            }
                        }
                    }else if(checkedCheckbox.length==1){
                        if(checkedCheckbox[0].name=="LowStock"){
                            for(let i=0;i<products.length;i++){
                                if(products[i].stock < 100){
                                    count++;
                                    tablebody.innerHTML+=`
                                    <tr class="orders-TableRow">
                                        <td class="orders-id">${products[i].id}</td>
                                        <td class="product-Name">${products[i].medicineName}</td>
                                        <td class="product-Brand">${products[i].medicineBrand}</td>
                                        <td class="Expiry-date">${products[i].expiryDate}</td>
                                        <td class="Unit-amount">$ ${products[i].unitPrice}</td>
                                        <td class="Stock">${products[i].stock}</td>
                                    </tr>
                                    `
                                }
                            }
                        }
                        if(checkedCheckbox[0].name=="Expired"){
                            for(let i=0;i<products.length;i++){
                                var expiryYear=products[i].expiryDate.slice(7,11);
                                // console.log(expiryYear);
                                if(expiryYear < 2023){
                                    count++;
                                    tablebody.innerHTML+=`
                                    <tr class="orders-TableRow">
                                        <td class="orders-id">${products[i].id}</td>
                                        <td class="product-Name">${products[i].medicineName}</td>
                                        <td class="product-Brand">${products[i].medicineBrand}</td>
                                        <td class="Expiry-date">${products[i].expiryDate}</td>
                                        <td class="Unit-amount">$ ${products[i].unitPrice}</td>
                                        <td class="Stock">${products[i].stock}</td>
                                    </tr>
                                    `
                                }
                            }
                            
                        }
                    }
                    else if(checkedCheckbox.length==0){
                        for(let i=0;i<products.length;i++){
                            count++;
                            tablebody.innerHTML+=`
                            <tr class="orders-TableRow">
                                <td class="orders-id">${products[i].id}</td>
                                <td class="product-Name">${products[i].medicineName}</td>
                                <td class="product-Brand">${products[i].medicineBrand}</td>
                                <td class="Expiry-date">${products[i].expiryDate}</td>
                                <td class="Unit-amount">$ ${products[i].unitPrice}</td>
                                <td class="Stock">${products[i].stock}</td>
                            </tr>
                            `
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


































// for(let j=0;j<checkedCheckbox.length;j++){
                    //     if(products[i].orderStatus==checkedCheckbox[j].name){
                    //         count++;
                    //         tablebody.innerHTML+=`
                    //         <tr class="orders-TableRow">
                    //             <td class="orders-id">${products[i].id}</td>
                    //             <td class="product-Name">${products[i].medicineName}</td>
                    //             <td class="product-Brand">${products[i].medicineBrand}</td>
                    //             <td class="Expiry-date">${products[i].expiryDate}</td>
                    //             <td class="Unit-amount">$ ${products[i].unitPrice}</td>
                    //             <td class="Stock">${products[i].stock}</td>
                    //         </tr>
                    //         `
                    //     }
                    // }