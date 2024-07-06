
function themSP() {
    document.getElementById("ThemSanPham").style.display = 'block'
    loadlaithe()    
    document.getElementById("Sua").style.display = 'none'
    document.getElementById("Them").style.display = 'block'
    var a=document.getElementById('maSP')
    a.readOnly = false;
}
function exit() {
    document.getElementById("ThemSanPham").style.display = document.getElementById("ThemSanPham").style.display == 'block' ? 'none' : 'block'
}
var listNPP = localStorage.getItem('listNPP')? JSON.parse(localStorage.getItem('listNPP')):[]
function Save()
{
    listNPP.push({
        maSP:document.getElementById('maSP').value,
        tenSP:document.getElementById('tenSP').value,
        anhSP:'../image/'+document.getElementById('anhSP').files[0].name,
        gia:document.getElementById('gia').value
    })
    localStorage.setItem('listNPP',JSON.stringify(listNPP))
    alert("Thm thành công")
    GetListSP()
}
function GetListSP(){
    var tbody=document.querySelector('#danhsachsanpham')
    var content=''
    listNPP.forEach(function(listNPP,index){
        content +=
                `<tr>
                    <td id="anh"><img src="${listNPP.anhSP}" alt=""></td>
                    <td>${listNPP.maSP}</td>
                    <td>${listNPP.tenSP}</td>
                    <td>${listNPP.gia}</td>
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
        listNPP.splice(index,1)
    }
    localStorage.setItem("listNPP",JSON.stringify(listNPP))
    window.location.reload();
}

btn_Sua = function(index){
    console.log(listNPP)
    document.getElementById("ThemSanPham").style.display = 'block'
    document.getElementById('maSP').value=listNPP[index].maSP
    document.getElementById('tenSP').value=listNPP[index].tenSP
    document.getElementById('gia').value=listNPP[index].gia
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
    listNPP.forEach(function(value,index){
        if(listNPP[index].maSP == msp){
            listNPP[index].tenSP = document.getElementById('tenSP').value
            listNPP[index].gia = document.getElementById('gia').value
        }
    })
    localStorage.setItem('listNPP',JSON.stringify(listNPP))
    alert ('Sửa thành công')
    GetListSP()
}
function loadlaithe(){
    document.getElementById('maSP').value = ''
    document.getElementById('tenSP').value = ''
    document.getElementById('gia').value = ''
}
