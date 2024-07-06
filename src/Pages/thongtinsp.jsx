import { useParams } from "react-router-dom";
import "../assets/css/thongtinsp.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { addtoCart } from "../utils/giohang";
import { useRecoilState } from "recoil";
import { cartState } from "../hook/cartState";



const Thongtinsp = function () {
  const { id } = useParams()
  const [data, setData] = useState([])

  const [activeTab, setActiveTab] = useState('tab1');
  const [carts, setCarts] = useRecoilState(cartState)
  const [spkhac, setSpKhac] = useState([])
  const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };


  useEffect(() => {
    async function loaddata() {
      try {
        const res = await axios.get('https://localhost:44395/api/SanPham/get_by_id?id=' + id);
        setData(res.data)

        const resq = await axios.post('https://localhost:44395/api/SanPham/search', {
          page: 1,
          pageSize: 10
        })
        setSpKhac(shuffleArray(resq.data.data).slice(0, 3))
      } catch {

      }

    }
    loaddata()
  }, []);

  console.log(data)
  console.log(id)
  return (
    <>
      <>
        <main>
          <div
            className="thongtintrang"
            style={{ marginLeft: "11%", marginTop: "1%" }}
          >
            <a
              href="../html/index.html"
              style={{ color: "black", fontWeight: "bold" }}
            >
              Trang chủ
            </a>
            <span style={{ margin: "0 15px" }}>&gt;</span>
            <a
              href="../html/index.html"
              style={{ color: "rgb(242, 44, 44)", fontWeight: "bold" }}
            >
              CHI TIẾT SẢN PHẨM
            </a>
          </div>
          <div>
            <img src="../image/Screenshot 2023-11-23 234824.png" alt="" />
          </div>
        </main>
        <main>
          {/*-------------  */}
          <div className="content" >
            <div className="content_left">
              <img src={"./../upload/" + data.anhDaiDien} alt="" className="imagesp" />
            </div>
            {/* .......................... */}
            <div className="content_right" >
              <div className="titlesp1">
                <p
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    marginBottom: 10,
                    color: "black"
                  }}
                  id="tenspx"
                >
                  {data.tenSanPham}
                </p>
                <p
                  style={{
                    fontSize: 19,
                    paddingBottom: 20,
                    color: "black",
                    fontWeight: "bold"
                  }}
                  className="content1"
                >
                  Lượt xem: 13947 | Ngày đăng: 2/2/2023
                  <span className="iconn" style={{ marginLeft: 143 }}>
                    <i style={{ marginRight: 6 }} className="fa-solid fa-thumbs-up" />{" "}
                    Thích 54
                  </span>
                  <span className="iconn">
                    <i
                      style={{ marginRight: 3 }}
                      className="fa-solid fa-share-from-square"
                    />
                    Share 27
                  </span>
                </p>
                <table
                  id="chitietsp"
                  style={{
                    width: "100%",
                    height: "auto",
                    marginTop: 10,
                    borderBottom: "1px solid black",
                    borderTop: "1px solid black",
                    padding: "20px 0px",
                    fontWeight: "bold"
                  }}
                >
                  <tbody>
                    <tr>
                      <td style={{ width: "40%" }}>Mã Sản Phẩm </td>
                      <td>: {data.maSanPham}</td>
                    </tr>
                    <tr>
                      <td>Giá đang khuyến mãi</td>
                      <td
                        colSpan={2}
                        style={{ color: "red", fontSize: 20, fontWeight: "bold" }}
                      >
                        :{" "}
                        <span
                          style={{
                            color: "red",
                            fontSize: 24,
                            fontWeight: "bold",
                            marginRight: 7
                          }}
                          className="giatien"
                        >
                          {data.gia ? data.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}
                        </span>


                      </td>
                    </tr>
                    <tr>
                      <td>Giá cũ </td>
                      <td colSpan={2}>: {data.giaGiam ? data.giaGiam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}</td>

                    </tr>
                    <tr>
                      <td>Tiết kiệm được</td>
                      <td colSpan={2}>
                        : {data.gia && data.giaGiam ? (
                          `${(data.giaGiam - data.gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} `
                          + `(${((data.giaGiam - data.gia) / data.giaGiam * 100).toFixed(2)}%)`
                        ) : 'N/A'}
                      </td>
                    </tr>

                    <tr>
                      <td>Xuất Xứ Hàng Hóa</td>
                      <td colSpan={2}>: Chính Hãng LOBINNI</td>
                    </tr>
                    <tr>
                      <td>Số lượng</td>
                      <td colSpan={2}>: {data.soLuong} ({data.soLuong > 0 ? 'Còn hàng' : 'Hết hàng'})</td>
                    </tr>


                  </tbody>
                </table>
                <div
                  style={{
                    width: "100%",
                    height: "auto",
                    marginTop: 46,
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between"
                  }}
                >
                  <button
                    className="click muangay"
                    style={{ backgroundColor: "rgb(0, 0, 0)" }}
                    onclick="Muangay()"
                  >
                    Mua Ngay
                  </button>
                  <button
                    className="click add-to-cart"
                    style={{ backgroundColor: "tomato" }}
                    onClick={() => {
                      // Kiểm tra xem người dùng đã đăng nhập hay chưa
                      const isLoggedIn = localStorage.getItem('matk')/* Thực hiện kiểm tra đăng nhập ở đây */;

                      // Nếu người dùng đã đăng nhập, thêm sản phẩm vào giỏ hàng và cập nhật giao diện
                      if (isLoggedIn) {
                        addtoCart({
                          maSanPham: data.maSanPham,
                          anhDaiDien: data.anhDaiDien,
                          tenSanPham: data.tenSanPham,
                          gia: data.gia,
                          quanity: 1
                        });
                        setCarts(JSON.parse(localStorage.getItem('cart')));
                      } else {
                        // Nếu người dùng chưa đăng nhập, chuyển hướng họ đến trang đăng nhập
                        window.location.href = '/login';
                      }
                    }}
                  >
                    Thêm vào giỏ hàng
                  </button>

                  <button
                    className="click muangay"
                    style={{ backgroundColor: "rgb(163, 167, 65)" }}
                    onclick=""
                  >
                    Trả góp qua CMND
                  </button>
                  <button
                    className="click muangay"
                    style={{ backgroundColor: "red" }}
                    onclick=""
                  >
                    Trả góp qua ATM
                  </button>
                  <button
                    className="click hotline"
                    style={{ width: "100%", backgroundColor: "mediumaquamarine" }}
                    onclick=""
                  >
                    Liên Hệ 0364174636
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="kengang2">
            <div className="title3">Sản Phẩm Khác</div>
          </div>
          <div className="containersp10" >
            {/* sản phẩm */}
            {spkhac.map(function (value, index) {
              return (
                <div key={index} className="boxsp10" style={{ marginRight: '120px' }}>
                  <a href={"/thongtinsp/" + value.maSanPham}>
                    <img style={{ maxWidth: 200, height: 200 }}

                      src={"./../upload/" + value.anhDaiDien}
                      alt="error"
                    />
                  </a>
                  <a href={"/thongtinsp/" + value.maSanPham} className="titlettsp">
                    {value.tenSanPham}
                    <br />

                  </a>
                  <div className="giattsp">
                    <p className="gia"> {value.gia ? value.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}</p>
                    <p className="giacu">{value.giaGiam ? value.giaGiam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}</p>
                    <span className="giamgia">-15%</span>
                  </div>
                </div>
              )
            })}


          </div>
        </main>

      </>


    </>
  );
}

export default Thongtinsp;

