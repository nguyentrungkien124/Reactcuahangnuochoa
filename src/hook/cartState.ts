import { atom, selector } from 'recoil';
import { CartItem } from '../Pages/giohang';
const cart:CartItem[]=localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')!):[]
export const cartState = atom({
  key: 'cartState', 
  default: cart, 
});
export const totalQuantityCart = selector({
  key: 'totalQuantityCart', 
  get:({get})=>{
    let carts:any[]=get(cartState)
    return carts.length
  }
});



