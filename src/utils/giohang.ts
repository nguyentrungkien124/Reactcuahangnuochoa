export function addtoCart(item: any){
    item.quantity = 1;
    var list;
    if(localStorage.getItem('cart') == null){
        list = [item];
    }else{
        list = JSON.parse(localStorage.getItem('cart')||'[]')
        let ok = true;
        for(let x of list){
            if(x.maSanPham == item.maSanPham){
                x.quantity += 1;
                ok = false;
                break;
            }
        }
        if(ok){
            list.push(item);
        }
    }
    localStorage.setItem('cart',JSON.stringify(list)); 
    alert("Da them gio hang thanh cong")
}