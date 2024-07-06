import React, { useEffect, useState } from 'react';
import "../assets/css/giohang.css";
import axios from 'axios';
import { notification } from 'antd';
import { Form, Input, Select, Button, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { cartState } from '../hook/cartState';


const { TextArea } = Input;
const { Option } = Select;


export interface CartItem {
  maSanPham: number,
  anhDaiDien: string;
  tenSanPham: string;
  gia: number;
  quantity: number;
}



const Giohang: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const setCartRecoil = useSetRecoilState<CartItem[]>(cartState)
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState<boolean>(false);
  // const [chitietHD, setChitietHD] = useState<any[]>([])
  // const navigate = useNavigate();
  const maxQuantity = 100
  const convertCartToChiTietHD = (cart: CartItem[]): any[] => {
    return cart.map(item => ({
      maChiTietHoaDon: 0,
      maHoaDon: 0,
      maSanPham: item.maSanPham,
      soLuong: item.quantity,
      tongGia: item.gia * item.quantity, // Tổng giá là giá đơn vị nhân với số lượng
      giamGia: '0', // Giảm giá, có thể là một giá trị cụ thể hoặc trống nếu không có giảm giá
      status: 0 // Trạng thái, có thể đặt là 0 nếu không có trạng thái đặc biệt
    }));
  };
  const [formData, setFormData] = useState({
    tenKH: '',
    email: '',
    sdt: '',
    cachThucThanhToan: '',
    tinhThanh: '',
    quanHuyen: '',
    phuongXa: '',
    soNhaTenDuong: '',
    ghiChu: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };



  const DatHang = async (formData: any) => {
    console.log('Sending formData:', formData);

    try {
      const chitietHD = convertCartToChiTietHD(cart);
      const dathang = {
        maKH: 0,
        tenKH: formData.tenKH,
        diaChi: `${formData.soNhaTenDuong}, ${formData.phuongXa}, ${formData.quanHuyen}, ${formData.tinhThanh}`,
        sdt: formData.sdt,
        maHoaDon: 0,
        trangThai: true,
        ngayTao: new Date().toISOString(),
        diaChiGiaoHang: `${formData.soNhaTenDuong}, ${formData.phuongXa}, ${formData.quanHuyen}, ${formData.tinhThanh}`,
        tongGia: totalPrice,
        cachThucThanhToan: `${formData.cachThucThanhToan}`,
        taikhoan_id :JSON.parse(localStorage.getItem('matk')!),
        
        list_json_ChiTietHD: chitietHD
      };
      console.log('Dữ liệu dathang được gửi:', dathang);
 
      const res = await axios.post(
        "https://localhost:44395/api/DatHang/Create",
        dathang
      );
      if (res) {
        notification.success({
          message: 'Thành công',
          description: 'Đã thêm hóa đơn nhập và chi tiết hóa đơn nhập thành công',
          placement: 'top',
          duration: 2
        });
        setCartRecoil([]);
        localStorage.removeItem("cart");
        // navigate('/'); 
      }
    } catch (error) {
      console.error("Lỗi data:", error);
      notification.error({
        message: 'Lỗi',
        description: 'Đã xảy ra lỗi khi thêm hóa đơn nhập hoặc chi tiết hóa đơn nhập',
        placement: 'top',
        duration: 2
      });
    }
  };

  useEffect(() => {
    let list: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(list);
  }, []);

  useEffect(() => {
    const totalPrice = cart.reduce((total, item) => total + item.gia * item.quantity, 0);
    setTotalPrice(totalPrice);
  }, [cart]);

  const handleDecreaseQuantity = (index: number) => {
    const updatedCart = [...cart];
    if (index >= 0 && index < updatedCart.length && updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleIncreaseQuantity = (index: number) => {
    const updatedCart = [...cart];
    if (index >= 0 && index < updatedCart.length && updatedCart[index].quantity < maxQuantity) {
      updatedCart[index].quantity++;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleRemoveItem = (index: number) => {
    // Sử dụng hộp thoại xác nhận của JavaScript
    const isConfirmed = window.confirm("Bạn có muốn xóa sản phẩm này không?");
    if (isConfirmed) {
      // Nếu người dùng xác nhận xóa, thực hiện xóa sản phẩm
      const updatedCart = cart.filter((_, i) => i !== index);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  const handleCheckout = () => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn thanh toán không?");
    if (isConfirmed) {
      DatHang(formData);
    }
  };

  return (
    <div>
      <main>
        <div
          className="thongtintrang"
          style={{ marginLeft: "0%", marginTop: "1%", paddingLeft: "15%", background: "rgb(237, 237, 146)" }}
        >
          <a href="../html/index.html" style={{ color: "black", fontWeight: "bold" }}>
            Trang chủ
          </a>
          <span style={{ margin: "0 15px" }}>&gt;</span>
          <a
            href="../html/giohang.html"
            style={{ color: "rgb(242, 44, 44)", fontWeight: "bold" }}
          >
            giỏ hàng
          </a>
        </div>
        <div>
          <img src="../image/Screenshot 2023-11-23 234824.png" alt="" />
        </div>
        <div className="content">
          <div className="content-left" style={{ marginBottom: 20 }}>
            <Form layout="vertical">
              <h2 style={{ marginBottom: 12, borderBottom: "1px solid", color: "red" }}>
                Thông tin liên hệ giao hàng
              </h2>
              <Form.Item label={<strong>Họ và tên</strong>} name="tenKH">
                <Input name="tenKH" value={formData.tenKH} onChange={handleInputChange} />
              </Form.Item>
              <Form.Item label={<strong>Email</strong>} name="email">
                <Input
                  type="email"
                  placeholder="Không bắt buộc"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item label={<strong>Số điện thoại</strong>} name="sdt">
                <Input name="sdt" value={formData.sdt} onChange={handleInputChange} />
              </Form.Item>
              <Form.Item label={<strong>Cách thức nhận hàng</strong>} name="cachThucThanhToan">
                <Select value={formData.cachThucThanhToan} onChange={value => setFormData(prev => ({ ...prev, cachThucThanhToan: value }))}>
                  <Option value="Giao hàng tận nơi">Giao hàng tận nơi</Option>
                  <Option value="Nhận hàng tại shop">Nhận hàng tại shop</Option>
                </Select>
              </Form.Item>

              <h2 style={{ marginBottom: 12, borderBottom: "1px solid", color: "red" }}>
                Địa chỉ giao hàng
              </h2>
              <Form.Item label={<strong>Chọn tỉnh thành*</strong>} name="tinhThanh" rules={[{ required: true, message: 'Vui lòng chọn tỉnh thành' }]}>
                <Select value={formData.tinhThanh} onChange={value => setFormData(prev => ({ ...prev, tinhThanh: value }))}>
                  <Option value="Hà Nội">Hà Nội</Option>
                  <Option value="Hải Dương">Hải Dương</Option>
                  <Option value="Hưng Yên">Hưng Yên</Option>
                  <Option value="Thái Bình">Thái Bình</Option>
                </Select>
              </Form.Item>

              <Form.Item label={<strong>Chọn quận huyện*</strong>} name="quanHuyen" rules={[{ required: true, message: 'Vui lòng chọn quận huyện' }]}>
                <Select value={formData.quanHuyen} onChange={value => setFormData(prev => ({ ...prev, quanHuyen: value }))}>
                  <Option value="Yên Mỹ">Hà Nội</Option>
                  <Option value="Khoái Châu">Khoái Châu</Option>
                  <Option value="Văn Lâm">Hưng Yên</Option>
                  <Option value="Tiên Lữ">Thái Bình</Option>
                </Select>
              </Form.Item>

              <Form.Item label={<strong>Phường xã</strong>} name="phuongXa" rules={[{ required: true, message: 'Vui lòng nhập xã' }]}>
                <Input name="phuongXa" value={formData.phuongXa} onChange={handleInputChange} />
              </Form.Item>

              <Form.Item label={<strong>Số nhà, tên đường*</strong>} name="soNhaTenDuong" rules={[{ required: true, message: 'Vui lòng nhập số nhà, tên đường' }]}>
                <Input name="soNhaTenDuong" value={formData.soNhaTenDuong} onChange={handleInputChange} />
              </Form.Item>

              <Form.Item label={<strong>Ghi chú</strong>} name="ghiChu">
                <TextArea
                  value={formData.ghiChu}
                  onChange={handleInputChange}
                  style={{ outlineColor: "rgb(150, 179, 225)" }}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" onClick={handleCheckout} >
                  THANH TOÁN
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="content-right">
            <legend
              style={{
                fontWeight: "bold",
                fontSize: 20,
                borderBottom: "1px solid red",
                color: "red"
              }}
            >
              Giỏ hàng của bạn
            </legend>
            {cart.length === 0 && (
              <p id="thongbao" style={{ color: "red" }}>
                Bạn chưa thêm sản phẩm nào vào giỏ hàng
              </p>
            )}

            <table className="content-right-giohang" id="ttgh">
              <thead>
                <tr>
                  <th>Hình</th>
                  <th>Thông tin sản phẩm</th>
                  <th style={{ width: 40 }}>SL</th>
                  <th style={{ width: 70 }}>Giá sản phẩm</th>
                  <th style={{ width: 100 }}>Thành tiền</th>
                  <th style={{ width: 50 }}>Xóa</th>
                </tr>
              </thead>
              {cart.map((x, index) => (
                <tbody key={index} id="sanpham-giohang">
                  <tr>
                    <td style={{ padding: '5px' }}>
                      <img src={"./../upload/" + x.anhDaiDien} style={{ width: '50px' }} alt={x.tenSanPham} />
                 
                    </td>
                    <td>
                      <p><span className="TTSP">{x.tenSanPham}</span></p>
                    </td>
                    <td className="sl">
                      <div className="quantity-container">
                        <div className="quantity-control giam" onClick={() => handleDecreaseQuantity(index)}>-</div>
                        <input type="text" className="quantity-input" value={x.quantity} readOnly />
                        <div className="quantity-control tang" onClick={() => handleIncreaseQuantity(index)}>+</div>
                      </div>
                    </td>

                    <td>
                      <p><span className="giasp">{x.gia ? x.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}</span><span></span></p>
                    </td>
                    <td>
                      <p>
                        <span className="thanhtien">
                          {x.quantity && x.gia ? (x.quantity * x.gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}
                        </span>
                        <span></span>
                      </p>
                    </td>
                    <td><button className="xoa" onClick={() => handleRemoveItem(index)}>Xóa</button></td>
                  </tr>
                </tbody>
              ))}

            </table>

            <form>
              <legend style={{ fontWeight: "bold" }}>Mã giảm giá (nếu có)</legend>
              <div className="form-group">
                <div className="form-group-input" style={{ padding: 0 }}>
                  <input type="text" className="content-left-input" />
                </div>
                <button className="apdung">Áp dụng</button>
              </div>
            </form>
            <form>
              <div
                style={{
                  width: "100%",
                  height: 30,
                  fontSize: 14,
                  borderBottom: "1px solid gray",
                  padding: 1
                }}
              >
                Chi tiết giảm giá
              </div>
              <div
                style={{
                  width: "100%",
                  height: 30,
                  fontSize: 20,
                  borderBottom: "1px solid gray",
                  padding: 2,
                  fontWeight: "bold",
                  marginTop: 15
                }}
              >
                Vận chuyển
              </div>
              <div
                style={{
                  width: "100%",
                  height: 30,
                  fontSize: 14,
                  padding: 5,
                  margin: "0px 0px 20px 10px"
                }}
              >
                Tổng trọng lượng sản phẩm: 400Gram
              </div>
              <div
                style={{
                  width: "100%",
                  height: 30,
                  fontSize: 30,
                  borderTop: "1px solid gray",
                  padding: 1,
                  fontWeight: "bold",
                  color: "red"
                }}
              >
                Tổng tiền thanh toán :{" "}
                <span
                  className="tongtienmua"
                  style={{
                    float: "right",
                    fontWeight: "bold",
                    paddingRight: 30,
                    color: "orangered",
                    fontSize: 24
                  }}
                >
                  {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </span>
              </div>
            </form>
          </div>
        </div>
      </main>

    </div>
  )
}
export default Giohang;
