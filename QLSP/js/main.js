var validation = new Validation();
var product = new Product();
var service = new Service();
function getEle(id){
    return document.getElementById(id);
}

function getInfo(isAdd){
    var accountName = getEle("accounT").value;
    var fullName = getEle("fullName").value;
    var passWord = getEle("passWord").value;
    var getEmail = getEle("Email").value;
    var getImage = getEle("imageInfo").value;
    var peopleType = getEle("peopleType").value;
    var languageType = getEle("languageType").value;
    var describeInfo = getEle("describeInfo").value;
      //taiKhoan
    var isValid = true;
    
if (isAdd) {
  isValid &=
    validation.kiemTraRong(accountName, "alertAccounts", "(*)  Vui lòng nhập tai khoan dung do dai") &&
    validation.kiemTraDoDaiKiTu(
      accountName,
      "alertAccounts",
      "(*)  Vui lòng nhập ki tu 4 - 10",
      4,
      10
    )
}

  // //Ten Nhanvien
   isValid &=
     validation.kiemTraRong(fullName, "alertFullName", "(*)  Vui lòng nhập tên SV") &&
     validation.kiemTraKiTuChuoi(
      fullName,
       "alertFullName",
       "(*)  Vui lòng nhập chuỗi ki tự"
     );

  // //Email
   isValid &=
     validation.kiemTraRong(getEmail, "alertEmail", "(*)  Vui lòng nhập email") &&
     validation.checkEmail(
      getEmail,
       "alertEmail",
       "(*)  Vui lòng nhập email dung dinh dang!"
     );
  
  // //Mat khau
   isValid &= validation.kiemTraRong(
    passWord,
     "alertPassword",
     "(*)  Vui lòng nhập pass"
   )&& validation.kiemTraDoDaiKiTu(
    passWord,
    "alertPassword",
    "(*)  Vui lòng nhập kí tự dài từ 5 đến 20 ký tự ",5,20
   )

  // //Lay hinh anh
   isValid &= validation.kiemTraRong(
    getImage,
     "imageAlert",
     "(*)  Vui long nhap hinh anh"
   );

  // //
   isValid &= validation.checkChucVu(
     "peopleType",
     "typePeopleAlert",
     "(*) Vui long chon loai nguoi dung"
   );

   isValid &= validation.checkChucVu(
    "languageType",
    "alertLanguageType",
    "(*) Vui long chon ngon ngu"
  );
  isValid &= validation.kiemTraRong(
    describeInfo,
    "describeAlert",
    "(*)  Vui lòng nhập ngay lam viec"
  );

  if (!isValid) return null;
  
  var product = new DanhSachSanPham(
    accountName,
    fullName,
    passWord,
    getEmail,
    peopleType,
    languageType,
    describeInfo,
    getImage,
  );

  return product;

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
    <td>${product.desc}</td>
    <td>${product.img}</td>
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
  var desc = getEle("describeInfo").value;
  var image = getEle("imageInfo").value;
  var product = new Product("",productName, price, screenType,backCamera,frontCamera,image,desc)
  service.addProductApi(product)
  .then(function(){
    fetchData();
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
   getEle("describeInfo").value= result.data.desc;
   getEle("imageInfo").value= result.data.img;
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
  var desc = getEle("describeInfo").value;
  var image = getEle("imageInfo").value;
  var product = new Product(id,productName, price, screenType,backCamera,frontCamera,image,desc)
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

