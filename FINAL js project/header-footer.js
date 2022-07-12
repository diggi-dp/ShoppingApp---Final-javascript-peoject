let productListData = window.localStorage.getItem('product-list');
productListData = productListData === null || productListData === '' ? [] : productListData;
productListData = productListData.length > 0 ? JSON.parse(productListData) : [];

let totalCount = 0;
for (var i = 0; i < productListData.length; i++) {
    totalCount = totalCount + productListData[i].count;
}
let cartcount = document.getElementById('cart-count')
cartcount.innerHTML = totalCount;