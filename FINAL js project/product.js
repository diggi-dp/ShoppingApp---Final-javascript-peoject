
const searchString = window.location.search;
const params = new URLSearchParams(searchString);
const productId = params.get('productId');

let productData = [];

// dynamically render the product  data 
function renderProductData() {
    let section = document.querySelector(".section");

    let leftdiv = document.createElement("div")
    let rightdiv = document.createElement("div")

    leftdiv.classList.add('left_div')
    rightdiv.classList.add('right_div')



    leftdiv.innerHTML = `<img src='${productData.preview}'
alt="image loading error">`;

    rightdiv.innerHTML = `
<div class="product-description">
<div class="text">
    <h1 class="name">${productData.name}</h1>
    <h4 class="brand">${productData.brand}</h4>
    <p class="price">Price: Rs <span>${productData.price}</span></p>
    <div class="description">
        <h4>Description</h4>
        <p>${productData.description}</p>
    </div>
</div>
<div class="preview">
    <h4>Product Preview</h4>
    <div class="previewimg">
        <img id="img1"
            src="${productData.photos[0]}"
            alt="image loading error">
        <img id="img2"
            src="${productData.photos[1]}"
            alt="image loading error">
        <img id="img3"
            src="${productData.photos[2]}"
            alt="image loading error">
        <img id="img4"
            src="${productData.photos[3]}"
            alt="">
        <img id="img5"
            src="${productData.photos[4]}"
            alt="">
        <img id="img6"
         src="${productData.photos[5]}"
         alt="">
    </div>
    <div id="btndiv">
        <button class="btn">Add to Cart</button>
    </div>
</div>
</div>`

    section.append(leftdiv)
    section.append(rightdiv)

    let previewimg = document.querySelector(".previewimg")
    let previewimg_nested1 = document.querySelector("#img1")
    previewimg_nested1.classList.add('currentborder')


    // preview image click handler 
    function previewimgonclickhandler(e) {
        if (e.target.nodeName === 'IMG') {
            currentsrc = e.target.src;
            document.querySelector(".left_div img").src = currentsrc;
            let allpreviewimg = previewimg.children
            for (var i = 0; i < allpreviewimg.length; i++) {
                allpreviewimg[i].classList.remove('currentborder');
            }
            e.target.classList.add('currentborder')
        }
    }
    previewimg.addEventListener('click', previewimgonclickhandler)


    // cart add button handler
    const cartbtn = document.getElementById('btndiv');

    cartbtn.addEventListener('click', () => {
        cartbtn.classList.add('bigger')
        setTimeout(() => {
            cartbtn.classList.remove('bigger')
        }, 200)

        var productList = window.localStorage.getItem('product-list');
        productList = productList === null || productList === '' ? [] : productList;
        productList = productList.length > 0 ? JSON.parse(productList) : [];

        var foundAtPos = -1;
        for (var i = 0; i < productList.length; i++) {
            if (parseInt(productList[i].id) == parseInt(productData.id)) {
                foundAtPos = i;
            }
        }

        if (foundAtPos > -1) {
            productList[foundAtPos].count = productList[foundAtPos].count + 1;
            console.log(productList[foundAtPos].count);
            window.localStorage.setItem('product-list', JSON.stringify(productList));
        } else {
            productData.count = 1;
            productList.push(productData);
            window.localStorage.setItem('product-list', JSON.stringify(productList));
        }

        var totalCount = 0;
        for (var i = 0; i < productList.length; i++) {
            totalCount = totalCount + productList[i].count;
        }
        let cartcount = document.getElementById('cart-count')
        cartcount.innerHTML = totalCount
    })

}

// get the product data from api 
fetch('https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + productId)
    .then(response => response.json())
    .then((data) => {
        productData = data;
        renderProductData(productData)
    })
    .catch((error) => {
        console.log(error);
    })
