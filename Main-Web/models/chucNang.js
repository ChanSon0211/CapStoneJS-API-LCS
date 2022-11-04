class Cart {
    constructor(id, name, price, screen, backCamera, frontCamera, img, desc, type) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.screen = screen;
        this.backCamera = backCamera;
        this.frontCamera = frontCamera;
        this.img = img;
        this.desc = desc;
        this.type = type;
    }
}

let listCart = [];

async function getData() {
    try {
      let { data } = await axios({
        url : "https://635ac8a4aa7c3f113daf5ebf.mockapi.io/Product",
        method: "GET",
      });
  
     listCart = mapData(data);
      renderCart(data);
    } catch (err) {
      console.log(err);
    }
  }
  
  window.onload = async function () {
    await getData();
    copyCart();
  };


function mapData(data) {
    if (!data) data = listCart;
    const result = [];
    for (let i = 0; i < data.length; i++) {
      const oldProduct = data[i];
      const newProduct = new Product(
        oldProduct.id,
        oldProduct.name,
        oldProduct.price,
        oldProduct.screen,
        oldProduct.backCamera,
        oldProduct.frontCamera,
        oldProduct.img,
        oldProduct.desc,
        oldProduct.type,
      );
      result.push(newProduct);
    }
    return result;
  }

function renderCart(data) {

    var tableHTML = "";
  
    for (let item in data) {
      var currentMobile = data[item];
      tableHTML += `<div class="row py-3">
      <div class="content__left d-flex col-9">
        <div class="image ">
          <img src='${currentMobile.img}' alt="" />
        </div>
        <div class="title">
          <h3>${currentMobile.name}</h3>
          <p>Screen:  ${currentMobile.screen}</p>
          <p>Back Camera:  ${currentMobile.backCamera}</p>
          <p>Front Camera: ${currentMobile.frontCamera}</p>
          <p>Mô tả:
          ${currentMobile.desc}
          </p>
          <p>Type : ${currentMobile.type}</p>
        </div>
      </div>
      <div class="content__right px-5 col-3">
        <div style="font-size:24px ; color : #a6122c ; border : 2px solid grey ;
        border-radius : 20px ;
        text-align : center; padding-bottom : 5px ; margin-bottom:10px " class="content__price">${currentMobile.price}</span></div>
        <div class="content__button">
          <button onclick="add_cart('${currentMobile.id}')"><i " class="fa fa-shopping-basket" aria-hidden="true"></i>Add to cart</button>
        </div>
      </div>
    </div>`;
    }
    document.getElementById("detailMobile").innerHTML = tableHTML;
    console.log(tableHTML)
  }



  function searchType() {
    let phoneType = document.getElementById("choice").value;
    let results = [];
    if (!phoneType) {
      results = listCart;
    } else {
      for (let i = 0; i < listCart.length; i++) {
        if (listCart[i].type === phoneType) {
          results.push(listCart[i]);
        }
      }
    }
  
    renderCart(results);
  }

let cart = [];
  function copyCart() {
    for (let data of listCart) {
      let addItem = new CartItems(
        {
          id: data.id,
          name: data.name,
          price: data.price,
          img: data.img,
          type: data.type,
        },
        0
      );
      cart.push(addItem);
    }
  }

// Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("cart");
var close = document.getElementsByClassName("close")[0];
var close_footer = document.getElementsByClassName("close-footer")[0];
var order = document.getElementsByClassName("order")[0];
btn.onclick = function () {
    modal.style.display = "block";
}
close.onclick = function () {
    modal.style.display = "none";
}
close_footer.onclick = function () {
    modal.style.display = "none";
}
order.onclick = function () {
    alert("Cảm ơn bạn đã thanh toán đơn hàng")
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// update cart 
function updatecart() {
    var cart_item = document.getElementsByClassName("cart-items")[0];
    var cart_rows = cart_item.getElementsByClassName("cart-row");
    var total = 0;
    for (var i = 0; i < cart_rows.length; i++) {
        var cart_row = cart_rows[i]
        var price_item = cart_row.getElementsByClassName("cart-price ")[0]
        var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0]
        var price = parseFloat(price_item.innerText)
        var quantity = quantity_item.value // lấy giá trị trong thẻ input
        total = total + (price * quantity)
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = total + '$'
}
setInterval(function () {
    var quantity_input = document.getElementsByClassName("cart-quantity-input");
    for (var i = 0; i < quantity_input.length; i++) {
        var input = quantity_input[i];
        input.addEventListener("change", function (event) {
            var input = event.target
            if (isNaN(input.value) || input.value <= 0) {
                input.value = 1;
            }
            updatecart()
        })
    }
}, 1000)



  
function add_cart(id) {
  
    const productsJSON = localStorage.getItem('products')
    const products = JSON.parse(productsJSON)
    const index = products.findIndex((item) => item.id == id);
    currentProduct= productsJSON;
    if (index !==  -1) {
        currentProduct = products[index];
    }
    const addproduct = { name: currentProduct.name, price: currentProduct.price, img: currentProduct.img, id: currentProduct.id};
    listCart = [...listCart, addproduct];
    saveData(listCart);
    renderMobile(id);
    updatecart();
    modal.style.display = "block";
}


function delete_cart(id) {
    const productsJSON = localStorage.getItem('products')
    const products = JSON.parse(productsJSON)
    const index = products.findIndex((item) => item.id == id);
    listCart.splice(index, 1);
    saveData(listCart);
    renderMobile(listCart);
    updatecart();

    modal.style.display = "block";
}
function delete_allCart() {
    const productsJSON = localStorage.getItem('products')
    const products = JSON.parse(productsJSON)
    listCart.splice(products)
    saveData(listCart);
    renderMobile();
    updatecart()
    modal.style.display = "block";
}
document.getElementById("thanhToan").onclick = () => {
    const productsJSON = localStorage.getItem('products');
    const products = JSON.parse(productsJSON);
    var total = document.getElementsByClassName("cart-total-price")[0].innerHTML;
    for (let i = 0; i < products.length; i++) {
        alert(` Tổng đơn của bạn là : ${total}`)
        break;

    }
    delete_allCart();
}
let renderMobile = () => {
    let getListCart = JSON.parse(localStorage.getItem("listCart"));
    let result = ``;
    getListCart.map(item => {
        result += `
        <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${item.img}" width="100" height="100">
                <span class="cart-item-title">${item.name}</span>
            </div>
            <span class="cart-price cart-column">${item.price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button" onclick="delete_cart(${item.id})">Xóa</button>
            </div>
        </div>
            `
    })
    document.getElementById("cart-items").innerHTML = result;
}
let saveData = (data) => {
    localStorage.setItem("listCart", JSON.stringify(data))
}
