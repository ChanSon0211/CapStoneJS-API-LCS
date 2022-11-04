var service = new Service();
function getEle(id) {
    return document.getElementById(id);
}
function fetchData() {
    service
        .getListProduct()
        .then(function (result) {
            //response
            renderHTMl(result.data);
            localStorage.setItem('products', JSON.stringify(result.data))
            // //hide loading
            // getEle("loading").style.display = "none";
        })
        .catch(function (error) {
            //response
            console.log(error);
            // //hide loading
            // getEle("loading").style.display = "none";
        })
}
fetchData();
function renderHTMl(data) {
    var content = "";
    data.forEach(function (product) {
        content += `
        <li class="main-product">
                    <div class="img-product">
                        <img class="img-prd"
                            src="${product.img}"
                            alt="">
                    </div>
                    <div class="content-product">
                        <h3 class="content-product-h3">${product.name}</h3>
                        <div class="content-product-deltals">
                            <div class="price" style="fontsize:16px ">
                                <span class="money gia">${product.price}</span>
                                <span class="money manHinh">Màn hình: ${product.screen}</span>
                                <span class="money cam1">Camera sau: ${product.backCamera}</span>
                                <span class="money cam2">Camera trước: ${product.frontCamera}</span>
                                <span class="money moTa cart-item-title">Mô tả: ${product.desc}</span>
                            <button type="button" class="btn btn-cart" onclick="add_cart(${product.id})">Add</button>
                            </div>
                        </div>
                    </div>
                </li>
        `
    });
    getEle("product_content").innerHTML = content;
}