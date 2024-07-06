// // const slide = document.querySelectorAll(".slider-content-item ")
// const neXt = document.querySelector(".right")
// const prev = document.querySelector(".left")
// let index = 0;
// console.log(neXt)
// console.log(prev)

// neXt.addEventListener("click",function(){
//     slide[index].classList.remove('active')
//     index = (index+1) % slide.length
//     slide[index].classList.add('active')
// })

// prev.addEventListener("click",function(){
//     slide[index].classList.remove('active')
//     index = (index-1 + slide.length) % slide.length
//     slide[index].classList.add('active')
// })
var sanpham=JSON.parse(localStorage.getItem('sp'))
function laySP()
{
 
  document.querySelector('.imagesp').src=sanpham.anhsp
  document.getElementById('tenspx').innerText=sanpham.tensp
  document.querySelector('.giatien').innerText=sanpham.giasp
  console.log(sanpham.tensp)
}
laySP()

var listGH=[]
function ThemvaoGH(){
  listGH=JSON.parse(localStorage.getItem("listGH"))==null?[]:JSON.parse(localStorage.getItem("listGH"))
  listGH.push(sanpham)
  localStorage.setItem("listGH",JSON.stringify(listGH))
  alert("Thêm vào giỏ hàng thành công ")
  location.href='giohang.html'
 
  
}
function Muangay(){
  listGH=JSON.parse(localStorage.getItem("listGH"))==null?[]:JSON.parse(localStorage.getItem("listGH"))
  listGH.push(sanpham)
  localStorage.setItem("listGH",JSON.stringify(listGH))
  alert("Bạn sẽ được chuyển tiếp đến trang mua hàng ! ")
  location.href='giohang.html'
  
}



// var selectedProduct = localStorage.getItem("selectedProduct");
// if (selectedProduct) {
//     var productInfo = JSON.parse(selectedProduct);
//     // Sử dụng thông tin sản phẩm để hiển thị chi tiết sản phẩm trên trang
//     // Ví dụ: productInfo.id, productInfo.name, productInfo.price, ...
//     // ...
// } else {
//     // Xử lý khi không có thông tin sản phẩm trong Local Storage
// }
// function luuThongTinSP(id) {
//   // Lấy thông tin sản phẩm dựa trên id hoặc các thuộc tính khác
//   var productInfo = {
//       id: id,
//       name: "Nước hoa Lancome Idole Now EDP",
//       price: 1000000,
//       // Thêm các thuộc tính khác của sản phẩm (nếu có)
//   };

//   // Lưu thông tin sản phẩm vào Local Storage
//   localStorage.setItem("selectedProduct", JSON.stringify(productInfo));

//   // Chuyển hướng đến trang chi tiết sản phẩm
//   window.location.href = "chi-tiet-san-pham.html";
// }
document.addEventListener("click", function(event) {
  if (event.target.classList.contains(" click add-to-cart")) {
    // Lấy thông tin sản phẩm từ phần tử cha của nút "Thêm vào giỏ hàng"
    var productElement = event.target.closest(".boxsp");
    var productName = productElement.querySelector("h3").textContent;

    // Chuyển hướng đến trang giỏ hàng và truyền thông tin sản phẩm qua URL
    var cartURL = "./giohang.html" + encodeURIComponent(productName);
    window.location.href = cartURL;
  }
});