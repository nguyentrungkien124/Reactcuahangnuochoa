
function themSP() {
    document.getElementById("ThemSanPham").style.display = 'block';
    loadlaithe()    
    document.getElementById("Sua").style.display = 'none'
    document.getElementById("Them").style.display = 'block'
    var a=document.getElementById('maDH')
    a.readOnly = false;
}
function exit()
{       
    location.reload()
}
localStorage.getItem('listDH')?null:localStorage.setItem('listDH',[])

var listDH = localStorage.getItem('listDH')? JSON.parse(localStorage.getItem('listDH')):[]
function Save()
{
    listDH.push({
        maDH:document.getElementById('maDH').value,
        tenDH:document.getElementById('tenDH').value,
        SL:document.getElementById('SL').value,
        Gia:document.getElementById('Gia').value,
        anhDH:'../image/'+document.getElementById('anhDH').files[0].name,

    })
    localStorage.setItem('listDH',JSON.stringify(listDH))
    alert('Thêm thành công')
    GetListSP()
}
function GetListSP(){
    var tbody = document.querySelector('#danhsachsanpham')
    var content = ''
    listDH.forEach(function(listDH,index){
        content +=
        `<tr>
        <td id="anhDH"><img src="${listDH.anhDH}" alt=""></td>
        <td>${listDH.tenDH}</td>
        <td>${listDH.maDH}</td>
        <td>${listDH.SL}</td>
        <td>${listDH.Gia}đ</td>
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
        listDH.splice(index,1)
    }
    localStorage.setItem("listDH",JSON.stringify(listDH))
    window.location.reload();
}
btn_Sua = function(index){
    console.log(listDH)
    document.getElementById("ThemSanPham").style.display = 'block'
    document.getElementById("maDH").value=listDH[index].maDH
    document.getElementById('tenDH').value=listDH[index].tenDH
    document.getElementById('SL').value=listDH[index].SL
    document.getElementById('Gia').value=listDH[index].Gia
    var Them = document.getElementById('Them')
    Them.style.display = 'none'
    var Sua = document.getElementById('Sua')
    Sua.style.display = 'block'
    var a=document.getElementById('maDH')
    a.readOnly = true;
}
function Sua(){
    var mdh = document.getElementById('maDH').value
    console.log(document.getElementById('tenDH').value)
    console.log(mdh)
    listDH.forEach(function(value,index){
        if(listDH[index].maDH == mdh){
            listDH[index].tenDH = document.getElementById('tenDH').value
            listDH[index].SL = document.getElementById('SL').value
            listDH[index].Gia = document.getElementById('Gia').value
        }
    })
    localStorage.setItem('listDH',JSON.stringify(listDH))
    alert('Sửa thành công')
    GetListSP()
}
function loadlaithe(){
    document.getElementById('tenDH').value = ''
    document.getElementById('maDH').value = ''
    document.getElementById('SL').value = ''
    document.getElementById('Gia').value = ''
    
}


