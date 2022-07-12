let productList = [];

// dynamically render the clothes and accessories data 
function renderProductData(productList) {
    const container = document.querySelectorAll('.container')
    for (let i = 0; i < productList.length; i++) {
        var currentproduct = productList[i];
        var card = document.createElement('div');
        card.classList.add('card');
        let currentproductId = +currentproduct.id; 
        card.id = currentproduct.id;
 
        var cardinnerhtml = `
        <a href="product.html?productId=${currentproductId}">
    <div class="img">
        <img src="${currentproduct.preview}"
            alt="error loading image">
    </div>
    <div class="card-details">
        <h3>${currentproduct.name}</h3>
        <h4>${currentproduct.brand}</h4>    
        <p>Rs ${currentproduct.price}</p>
    </div>
</a>`;

        card.innerHTML = cardinnerhtml;

        if (!currentproduct.isAccessory) {
            container[0].append(card);
        }
        else{
            container[1].append(card)
        }
    }


}

// get productList data from API end point 
fetch(`https://5d76bf96515d1a0014085cf9.mockapi.io/product`)
    .then(response => response.json())
    .then((data) => {
        productList = data;
        renderProductData(productList); 
    })
    .catch((error) => {
        console.log(error);
    })