function themSP() {
    document.getElementById("ThemSanPham").style.display = 'block';
    loadlaithe()    
    document.getElementById("Sua").style.display = 'none'
    document.getElementById("Them").style.display = 'block'
    var a=document.getElementById('maDN')
    a.readOnly = false;
}

function exit()
{       
    location.reload()
}


localStorage.getItem('listDN')?null:localStorage.setItem('listDN',[])

var listDN = localStorage.getItem('listDN')? JSON.parse(localStorage.getItem('listDN')):[]
function Save()
{
    listDN.push({
        maDN:document.getElementById('maDN').value,
        tenDN:document.getElementById('tenDN').value,
        SL:document.getElementById('SL').value,
        Gia:document.getElementById('Gia').value,
        anhDN:'../image/'+document.getElementById('anhDN').files[0].name,
    })
    localStorage.setItem('listDN',JSON.stringify(listDN))
    alert('Thêm thành công đơn')
    GetListSP()
}
function GetListSP(){
    var tbody = document.querySelector('#danhsachsanpham')
    var content = ''
    listDN.forEach(function(listDN,index){
        content +=
        `<tr>
        <td id="anhDN"><img src="${listDN.anhDN}" alt=""></td>
        <td>${listDN.tenDN}</td>
        <td>${listDN.maDN}</td>
        <td>${listDN.SL}</td>
        <td>${listDN.Gia}đ</td>
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
        listDN.splice(index,1)
    }
    localStorage.setItem("listDN",JSON.stringify(listDN))
    window.location.reload();
}
btn_Sua = function(index){
    console.log(listDN)
    document.getElementById("ThemSanPham").style.display = 'block'
    document.getElementById('maDN').value=listDN[index].maDN
    document.getElementById('tenDN').value=listDN[index].tenDN
    document.getElementById('SL').value=listDN[index].SL
    document.getElementById('Gia').value=listDN[index].Gia
    var Them = document.getElementById('Them')
    Them.style.display = 'none'
    var Sua = document.getElementById('Sua')
    Sua.style.display = 'block'
    var a=document.getElementById('maDN')
    a.readOnly = true;
}
function Sua(){
    var mdn = document.getElementById('maDN').value
    console.log(document.getElementById('tenDN').value)
    console.log(mdn)
    listDN.forEach(function(value,index){
        if(listDN[index].maDN == mdn){
            listDN[index].tenDN = document.getElementById('tenDN').value
            listDN[index].SL = document.getElementById('SL').value
            listDN[index].Gia = document.getElementById('Gia').value
        }
    })
    localStorage.setItem('listDN',JSON.stringify(listDN))
    alert('Sửa thành công')
    GetListSP()
}
function loadlaithe(){
    document.getElementById('tenDN').value = ''
    document.getElementById('maDN').value = ''
    document.getElementById('SL').value = ''
    document.getElementById('Gia').value = ''
    
}
