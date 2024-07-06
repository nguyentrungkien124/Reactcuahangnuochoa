
function thanhtoan(){
    alert("Đã mua sản phẩm thành công ")
    listSP=null;
    localStorage.setItem("listGH",JSON.stringify(listSP))
    location.href='giohang.html'
}
// Lấy tất cả các hàng sản phẩm trong bảng
var rows = document.querySelectorAll("tbody tr");
function hienthiGH()
{
    
    var ttgh=document.getElementById("sanpham-giohang")
    var listSP=JSON.parse(localStorage.getItem("listGH"))
    if(listSP.length<1)
    {
        document.getElementById("thongbao").style.display="block"
    }
    
        var thongtincacsp=null;
        listSP.forEach(x => {
        thongtincacsp=thongtincacsp==null?
        `<tr>
        <td style="padding: 5px;"><img src="${x.anhsp}" style="width: 50px;"></td>
        <td><p><span class="TTSP">${x.tensp} </span></p></td>
        <td><input class="sl" type="number" onchange="capnhatgiatien(this)" value="1" min="1"></td>                            
        <td> <p><span class="giasp gia">${x.giasp}</span></p></td>
        <td> <p><span class="thanhtien gia">${x.giasp}</span></p></td>
        <td><button onclick="XoaSP(this)" class="xoa">Xóa</button></td>
        </tr>
        `:thongtincacsp+
        `<tr>
        <td style="padding: 5px;"><img src="${x.anhsp}" style="width: 50px;"></td>
        <td><p><span class="TTSP">${x.tensp} </span></p></td>
        <td><input class="sl" type="number"  onchange="capnhatgiatien(this)" value="1" min="1"></td>                            
        <td> <p><span class="giasp gia">${x.giasp}</span></p></td>
        <td> <p><span class="thanhtien gia">${x.giasp}</span></p></td>
        <td><button onclick="XoaSP(this)" class="xoa">Xóa</button></td>
        </tr>
        `

        });
        ttgh.innerHTML = thongtincacsp;

        
        var listTG=document.querySelectorAll(".gia")
        console.log(listTG)
        listTG.forEach(x => {
            x.innerHTML=parseFloat(x.innerHTML).toLocaleString('vi-VN', { minimumFractionDigits: 0 });
        })
    
    

    
}

function XoaSP(x)
{
    var nodecha=x.parentElement.parentElement
    
    var listSP=JSON.parse(localStorage.getItem("listGH"))
    console.log(listSP)
    var index=listSP.find(x=>x.tensp===nodecha.children[1].children[0].children[0])
    listSP.splice(index,1)
    console.log(listSP)
     localStorage.setItem("listGH",JSON.stringify(listSP))
    hienthiGH()
}

function capnhatgiatien(x) {
    let tong=0;
    var cha = x.parentElement.parentElement;
    var giasp = cha.children[3].children[0].children[0].innerText.replace(/\D/g, '');
    var thanhtien = cha.children[4].children[0].children[0];
    tong=x.value*giasp
    thanhtien.innerText=tong.toLocaleString('vi-VN', { minimumFractionDigits: 0 })
    
    
  tinhtongtien()

 }

hienthiGH()

body =document.querySelector('.tongtienmua')
function tinhtongtien(){
    var tong = 0;
    var sp_cart = document.querySelectorAll('.thanhtien')
    sp_cart.forEach(e => {
        tong+=Number(e.innerText.replace(/\D/g, ''))
    });
    body.innerText=tong.toLocaleString('vi-VN', { minimumFractionDigits: 0 })+' VNĐ';
   
}
tinhtongtien()
