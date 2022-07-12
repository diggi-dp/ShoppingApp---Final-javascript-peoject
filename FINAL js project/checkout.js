
let cardList = document.getElementById('card-list');


function cardListRender(currProduct) {
    let div = document.createElement('div')
    div.classList.add('checkout-card');
    div.innerHTML = `
    <div>
    <img class="checkout-product-img" src="${currProduct.preview}">
    </div>
    <div>
        <h4>${currProduct.name}</h4>
        <p>x${currProduct.count}</p>
        <p>Amount: Rs <span>${currProduct.price}</span></p>
        </div>
        `;

    return div;
}


var productList = window.localStorage.getItem('product-list');
productList = productList === null || productList === '' ? [] : productList;
productList = productList.length > 0 ? JSON.parse(productList) : [];


var grandTotal = 0;
for (var i = 0; i < productList.length; i++) {
    cardList.append(cardListRender(productList[i]));


    var totalForCurrentProduct = parseFloat(productList[i].count) * parseFloat(productList[i].price);

    grandTotal = grandTotal + totalForCurrentProduct;

}

$('#item-count').html(productList.length);
$('#total-amount').html(grandTotal);

// btn click fn start 
$('#btn-place-order').click(function () {
    // obj with all items and prices ,to place order 
    var orderItemArr = [];
    for (var i = 0; i < productList.length; i++) {
        var prodObj = {
            "id": productList[i].id,
            "brand": productList[i].brand,
            "name": productList[i].name,
            "price": productList[i].price,
            "preview": productList[i].preview,
            "isAccessory": productList[i].isAccessory
        }

        orderItemArr.push(prodObj);
    }


    var dataObj = {
        amount: grandTotal,
        products: orderItemArr
    }

    fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/order', {
        method: 'POST',
        body: JSON.stringify(dataObj),
        headers: { 'content-type': 'application/json; charset=UTF-8' }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.log(alert('server not responding'))
                throw new Error('something went wrong');
            }
        })
        .then(data => {
            console.log(data)
            localStorage.setItem('product-list', []);
            location.assign('/.thankyou.html');
        })
        .catch(error => {
            console.log(error)
        })
})
// btn click fn end 
