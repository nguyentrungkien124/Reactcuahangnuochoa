
function themSP() {
    document.getElementById("ThemSanPham").style.display = 'block'
    loadlaithe();
    document.getElementById("Sua").style.display = 'none'
    document.getElementById("Them").style.display = 'block'
    var a=document.getElementById('maSP')
    a.readOnly = false;
}
function exit() {
    document.getElementById("ThemSanPham").style.display = document.getElementById("ThemSanPham").style.display == 'block' ? 'none' : 'block'
}
var obj = localStorage.getItem('obj')? JSON.parse(localStorage.getItem('obj')):[]
function Save()
{
    obj.push({
        maSP:document.getElementById('maSP').value,
        tenSP:document.getElementById('tenSP').value,
        anhSP:'../image/'+document.getElementById('anhSP').files[0].name,
        gia:document.getElementById('gia').value
    })
    localStorage.setItem('obj',JSON.stringify(obj))
    alert("Thêm thành công")
    GetListSP()
}
function GetListSP(){
    var tbody=document.querySelector('#danhsachsanpham')
    var content=''
    obj.forEach(function(obj,index){
        content +=
                `<tr>
                    <td id="anh"><img src="${obj.anhSP}" alt=""></td>
                    <td>${obj.maSP}</td>
                    <td>${obj.tenSP}</td>
                    <td>${obj.gia}đ</td>
                    <td class="sua"><button onclick="btn_Sua(${index})">Sửa </button></td>
                    <td class="xoa"><button onclick="Sanpham_Delete(${index})">Xóa</button></td>
                </tr>`
    })
    tbody.innerHTML=content
}
GetListSP()
Sanpham_Delete = function(index){
    var result= confirm("Bạn có muốn xóa không!")
    if(result){
        obj.splice(index,1)
    }
    localStorage.setItem("obj",JSON.stringify(obj))
    window.location.reload();
}

btn_Sua = function(index){
    console.log(obj)
    document.getElementById("ThemSanPham").style.display = 'block'
    document.getElementById('maSP').value=obj[index].maSP
    document.getElementById('tenSP').value=obj[index].tenSP
    document.getElementById('gia').value=obj[index].gia
    var Them = document.getElementById('Them')
    Them.style.display = 'none'
    var Sua = document.getElementById('Sua')
    Sua.style.display = 'block'
    var a=document.getElementById('maSP')
    a.readOnly = true;
}
function Sua(){
    var msp= document.getElementById('maSP').value
    console.log( document.getElementById('tenSP').value)
    console.log(msp)
    obj.forEach(function(value,index){
        if(obj[index].maSP == msp){
            obj[index].tenSP = document.getElementById('tenSP').value
            obj[index].gia = document.getElementById('gia').value
        }
    })
    localStorage.setItem('obj',JSON.stringify(obj))
    alert ('Sửa thành công')
    GetListSP()
}
function loadlaithe(){
    document.getElementById('maSP').value = ''
    document.getElementById('tenSP').value = ''
    document.getElementById('gia').value = ''
}
