function themSP() {
    document.getElementById("ThemSanPham").style.display = 'block';
    loadlaithe()    
    document.getElementById("Sua").style.display = 'none'
    document.getElementById("Them").style.display = 'block'
    var a=document.getElementById('maNV')
    a.readOnly = false;
}
function exit()
{       
    location.reload()
}

localStorage.getItem('listNV')?null:localStorage.setItem('listNV',[])

var listNV = localStorage.getItem('listNV')? JSON.parse(localStorage.getItem('listNV')):[]
function Save(){

    listNV.push({
        tenNV:document.getElementById('tenNV').value,
        maNV:document.getElementById('maNV').value,
        SĐT:document.getElementById('SĐT').value,
        Email:document.getElementById('Email').value,
        QQ:document.getElementById('QQ').value

    })
    localStorage.setItem('listNV',JSON.stringify(listNV))
    alert('Thêm thành công')
    GetListSP()
}
function GetListSP(){
    var tbody= document.querySelector('#danhsachsanpham') 
    var content = ''
    listNV.forEach(function(listNV,index){
        content +=
                `<tr>
                        <td>${listNV.tenNV}</td>
                        <td>${listNV.maNV}</td>
                        <td>${listNV.SĐT}</td>
                        <td>${listNV.Email}</td>
                        <td>${listNV.QQ}</td>
                        <td class="sua"><button onclick="btn_Sua(${index})">Sửa </button></td>
                        <td class="xoa"><button onclick="Sanpham_Delete(${index})">Xóa</button></td>
                </tr>`

    })
    tbody.innerHTML=content
}
GetListSP()
Sanpham_Delete = function(index){
    var result = confirm("Bạn có muốn xóa không!")
    if(result){
        listNV.splice(index,1)
    }
    localStorage.setItem("listNV",JSON.stringify(listNV))
    window.location.reload();
}
btn_Sua = function(index){
    console.log(listNV)
    document.getElementById("ThemSanPham").style.display = 'block'
    document.getElementById('tenNV').value=listNV[index].tenNV
    document.getElementById('maNV').value=listNV[index].maNV
    document.getElementById('SĐT').value=listNV[index].SĐT
    document.getElementById('Email').value=listNV[index].Email
    document.getElementById('QQ').value=listNV[index].QQ
    var Them = document.getElementById('Them')
    Them.style.display = 'none'
    var Sua = document.getElementById('Sua')
    Sua.style.display = 'block'
    var a=document.getElementById('maNV')
    a.readOnly = true;
}
function Sua(){
    var mnv = document.getElementById('maNV').value
    console.log(document.getElementById('tenNV').value)
    console.log(mnv)
    listNV.forEach(function(value,index){
        if(listNV[index].maNV == mnv){
            listNV[index].tenNV = document.getElementById('tenNV').value
            listNV[index].SĐT = document.getElementById('SĐT').value
            listNV[index].Email = document.getElementById('Email').value
            listNV[index].QQ = document.getElementById('QQ').value
        }
    })
    localStorage.setItem('listNV',JSON.stringify(listNV))
    alert('Sửa thành công')
    GetListSP()
}
function loadlaithe(){
    document.getElementById('tenNV').value = ''
    document.getElementById('maNV').value = ''
    document.getElementById('SĐT').value = ''
    document.getElementById('Email').value = ''
    document.getElementById('QQ').value = ''
    
}