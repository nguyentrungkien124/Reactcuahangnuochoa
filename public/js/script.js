const slideItems = document.querySelectorAll(".slider-content-item");
const nextButton = document.querySelector(".right");
const prevButton = document.querySelector(".left");
let currentIndex = 0;

function nextSlide() {
  slideItems[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % slideItems.length;
  slideItems[currentIndex].classList.add("active");
}

nextButton.addEventListener("click", nextSlide);
function laydulieuTrangchu(y)
{
   var x=y.parentElement.parentElement.parentElement
    sanPham={
        
            anhsp:x.children[0].src,
            tensp:x.children[1].children[0].children[0].innerText,
            giasp:x.children[1].children[0].children[1].children[0].innerText

    }
 
    localStorage.setItem("sp",JSON.stringify(sanPham))
    location.href="thongtinsp.html"
}
prev.addEventListener("click",function(){
    slide[index].classList.remove('active')
    index = (index-1 + slide.length) % slide.length
    slide[index].classList.add('active')
})
function laydulieu(x)
{
    var nodecha=x.parentElement.parentElement;
    sanPham={
        
            anhsp:x.src,
            tensp:nodecha.children[1].innerText,
            giasp:nodecha.children[2].children[0].innerText

    }
   console.log(sanPham)
    localStorage.setItem("sp",JSON.stringify(sanPham))
}

var listGH=[]

function ThemvaoGH_TrangChu(y){
    var x=y.parentElement.parentElement
    sanPham={
        
        anhsp:x.children[0].src,
        tensp:x.children[1].children[0].children[0].innerText,
        giasp:x.children[1].children[0].children[1].children[0].innerText

           }
  localStorage.setItem("sp",JSON.stringify(sanPham))
  var sanpham=JSON.parse(localStorage.getItem('sp'))
  listGH=JSON.parse(localStorage.getItem("listGH"))==null?[]:JSON.parse(localStorage.getItem("listGH"))
  listGH.push(sanpham)
  localStorage.setItem("listGH",JSON.stringify(listGH))
  alert("Thêm vào giỏ hàng thành công ")
  // eslint-disable-next-line no-restricted-globals
  location.href='giohang.html'
 
  
}
// ------------hien thi so luong da them o trang gio hang----------
function updateCartItemCount() {
    var cart = JSON.parse(localStorage.getItem('listGH')) || {};
    var itemCount = 0;  // 
    for (var productId in cart) {
        if (cart.hasOwnProperty(productId)) {
            itemCount += 1; // Tổng số lượng sản phẩm trong giỏ hàng
        }
    }
    // console.log(itemCount)
    var cartItemCountElement= document.getElementById("count_cart")
    // Hiển thị số lượng đơn hàng bên cạnh icon giỏ hàng
    cartItemCountElement.textContent = itemCount;

    if(itemCount==0){
        cartItemCountElement.textContent = "";
    }
}
updateCartItemCount()


var tg=localStorage.getItem("listGH")
if(tg==null)
{
    localStorage.setItem("listGH",null)
}


document.addEventListener("click", function(event) {
    if (event.target.classList.contains(" click add-to-cart")) {
      // Lấy thông tin sản phẩm từ phần tử cha của nút "Thêm vào giỏ hàng"
      var productElement = event.target.closest(".boxsp");
      var productName = productElement.querySelector("h3").textContent;
  
      // Chuyển hướng đến trang giỏ hàng và truyền thông tin sản phẩm qua URL
      var cartURL = "../giohang.html?product=" + encodeURIComponent(productName);
      window.location.href = cartURL;
    }
  });


  let slideIndex = 0;
  showSlides();
  
  function showSlides() {
      let i;
      const slides = document.querySelectorAll('.slider-content-item');
  
      // Ẩn tất cả các slide
      for (i = 0; i < slides.length; i++) {
          slides[i].classList.remove('active');
      }
  
      slideIndex++;
      if (slideIndex > slides.length) {
          slideIndex = 1;
      }
  
      // Hiển thị slide hiện tại
      slides[slideIndex - 1].classList.add('active');
  
      setTimeout(showSlides, 2000); // Chuyển slide sau mỗi 3 giây (3000 milliseconds)
  }
