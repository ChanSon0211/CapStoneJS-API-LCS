var validation = new Validation();
var product = new Product();
var service = new Service();
function getEle(id){
    return document.getElementById(id);
}


function renderTable(data){
    var content = "";
    data.forEach(function(product){

    
    content +=`
    <tr>
    <td>${product.id}</td>
    <td>${product.name}</td>
    <td>${product.price}</td>
    <td>${product.screen}</td>
    <td>${product.backCamera}</td>
    <td>${product.frontCamera}</td>
    <td>${product.img}</td>
    <td>${product.desc}</td>
    <td>${product.type}</td>
      <td>
     <button class="btn btn-success mt-3"  onclick="xoaTT(${product.id})">Xoa</button>
      <button class="btn btn-success mt-3" data-toggle="modal" data-target="#myModal"  onclick="capnhatTT(${product.id})">Cap Nhat</button></td>


    </tr>
    `
    });
    getEle("danhsachND").innerHTML = content;
}
// cai chỗ đó đâu 
function fetchData(){
  service
  .getListProduct()
  .then(function(result){
    renderTable(result.data);
  })
  .catch(function (error){
    console.log(error);
  })

}
fetchData();
// document.getElementById("btn_Sua").onclick=function suaTT(){

// }

 function xoaTT(id){
  service.deleteProductApi(id)
  .then(function(){
    fetchData();
  })
  .catch(function(error){
    console.log(error);
  })
}
function themTT(){
  var productName = getEle("accounT").value;
  var price = getEle("price").value;
  var screenType = getEle("screenType").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var image = getEle("imageInfo").value;
  var desc = getEle("describeInfo").value;
  var type = getEle("typeItem").value;
  var product = new Product("",productName, price, screenType,backCamera,frontCamera,image,desc,type)
  service.addProductApi(product)
  .then(function(){
    fetchData();
    alert("Thêm thành công");
  })
  .catch(function(error){
    console.log(error);
  })
}
function capnhatTT(id){
  document.getElementsByClassName("modal-title")[0].innerHTML="cap nhat SP";
  var btnUpdate = `<button class = "btn btn-success" onclick ="updateProduct(${id})">Update</button>`
  document.getElementsByClassName("modal-footer")[0].innerHTML=btnUpdate;
  service
  .getProductById(id)
  .then(function(result){
   getEle("accounT").value = result.data.name;
   getEle("price").value=result.data.price;
  getEle("screenType").value=result.data.screen;
  getEle("backCamera").value = result.data.backCamera;
  getEle("frontCamera").value= result.data.frontCamera;
  getEle("imageInfo").value= result.data.img; 
  getEle("describeInfo").value= result.data.desc;
  getEle("typeItem").value= result.data.type; 
 
   fetchData();
  })
  .catch(function(error){
    console.log(error);
  })
}

function updateProduct(id){
  var productName = getEle("accounT").value;
  var price = getEle("price").value;
  var screenType = getEle("screenType").value;
  var backCamera = getEle("backCamera").value;
  var frontCamera = getEle("frontCamera").value;
  var image = getEle("imageInfo").value;
  var desc = getEle("describeInfo").value;
  var type = getEle("typeItem").value;
  var product = new Product(id,productName, price, screenType,backCamera,frontCamera,image,desc,type);
  service.updateProductApi(product)
  .then(function(){
    fetchData();
    document.getElementsByClassName("close")[0].click()
    
  }).catch(function(error){
    console.log(error);
  })
}
function setLocalStorage() {
    //Convert JSON => string
    var dataString = JSON.stringify(DSSP.arr);
    //Luu xuong localStorage
    localStorage.setItem("DanhSachNhanVien", dataString);
  }
  
  function getLocalStorage() {
    if (localStorage.getItem("DanhSachNhanVien")) {
      var dataString = localStorage.getItem("DanhSachNhanVien");
      //Convet string => JSON
      var dataJson = JSON.parse(dataString);
      //backup lại dự liệu cho dssv.arr từ dataJson
      dssv.arr = dataJson;
      //hiển thị dssv ra ngoài table
      renderTable(dataJson);

























      
    }
  }

