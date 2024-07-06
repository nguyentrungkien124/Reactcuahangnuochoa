
function themSP() {
    document.getElementById("ThemSanPham").style.display = 'block';
    loadlaithe()    
    document.getElementById("Sua").style.display = 'none'
    document.getElementById("Them").style.display = 'block'
    var a=document.getElementById('MaKH')
    a.readOnly = false;
}
function exit()
{       
    location.reload()
}

var listKH = localStorage.getItem('listKH')? JSON.parse(localStorage.getItem('listKH')):[]
function Save(){

    listKH.push({
        TenKH:document.getElementById('TenKH').value,
        MaKH:document.getElementById('MaKH').value,
        SĐT:document.getElementById('SĐT').value,
        Email:document.getElementById('Email').value

    })
    localStorage.setItem('listKH',JSON.stringify(listKH))
    alert('Thêm thành công')
    GetListSP()
}
function GetListSP(){
    var tbody= document.querySelector('#danhsachsanpham') 
    var content = ''
    listKH.forEach(function(listKH,index){
        content +=
        `<tr>
        <td>${listKH.TenKH}</td>
        <td>${listKH.MaKH}</td>
        <td>${listKH.SĐT}</td>
        <td>${listKH.Email}</td>
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
        listKH.splice(index,1)
    }
    localStorage.setItem("listKH",JSON.stringify(listKH))
    window.location.reload();
}

btn_Sua = function(index){
    console.log(listKH)
    document.getElementById("ThemSanPham").style.display = 'block'
    document.getElementById('TenKH').value=listKH[index].TenKH
    document.getElementById('MaKH').value=listKH[index].MaKH
    document.getElementById('SĐT').value=listKH[index].SĐT
    document.getElementById('Email').value=listKH[index].Email
    var Them = document.getElementById('Them')
    Them.style.display = 'none'
    var Sua = document.getElementById('Sua')
    Sua.style.display = 'block'
    var a=document.getElementById('MaKH')
    a.readOnly = true;
}
function Sua(){
    var maKH = document.getElementById('MaKH').value
    console.log(document.getElementById('TenKH').value)
    console.log(maKH)
    listKH.forEach(function(value,index){
        if(listKH[index].MaKH == maKH){
            listKH[index].TenKH = document.getElementById('TenKH').value
            listKH[index].SĐT = document.getElementById('SĐT').value
            listKH[index].Email = document.getElementById('Email').value
        }
    })
    localStorage.setItem('listKH',JSON.stringify(listKH))
    alert('Sửa thành công')
    GetListSP()
}
function loadlaithe(){
    document.getElementById('TenKH').value = ''
    document.getElementById('MaKH').value = ''
    document.getElementById('SĐT').value = ''
    document.getElementById('Email').value = ''
    
}
