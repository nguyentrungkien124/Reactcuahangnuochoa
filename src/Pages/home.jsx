import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "../assets/css/style.css";

const Home = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === data5.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? data5.length - 1 : prevIndex - 1
    );
  };

  const shuffleArray = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  useEffect(() => {
    async function loadData() {
      try {
        const response1 = await axios.post('https://localhost:44395/api/SanPham/search_ChuyenMuc', {
          page: 1,
          pageSize: 20,
          MaChuyenMuc: 1 // Nước hoa nam
        });
        const response2 = await axios.post('https://localhost:44395/api/SanPham/search_ChuyenMuc', {
          page: 1,
          pageSize: 20,
          MaChuyenMuc: 2 // Nước hoa nữ
        });
        const response3 = await axios.post('https://localhost:44395/api/SanPham/search_ChuyenMuc', {
          page: 1,
          pageSize: 20,
          MaChuyenMuc: 3 // Combo
        });
        const response4 = await axios.post('https://localhost:44395/api/SanPham/Search_SP_BanChay', {
          page: 1,
          pageSize: 20
        });
        const response5 = await axios.post('https://localhost:44381/api/Slide/Slide_Search', {});

        setData1(shuffleArray(response1.data.data).slice(0, 10));
        setData2(shuffleArray(response2.data.data).slice(0, 10));
        setData3(shuffleArray(response3.data.data).slice(0, 10));
        setData4(shuffleArray(response4.data.data).slice(0, 10));
        setData5(response5.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    loadData();
    const interval = setInterval(() => {
      setCurrentImageIndex(prevSlide => (prevSlide + 1) % data5.length);
      // console.log(data5)
    }, 1000); // Thay đổi thời gian theo nhu cầu

    return () => clearInterval(interval);
  }, [data5.length]);

  return (
    <div>
      <section className="slider">
        <div className="slider-content">
          <div className="slider-content-pre-next">
            <a className="left" onClick={prevSlide} >
              <FontAwesomeIcon style={{ fontSize: 40 }} icon={faChevronLeft} />
            </a>
            <a className="right" onClick={nextSlide}>
              <FontAwesomeIcon style={{ fontSize: 40 }} icon={faChevronRight} />
            </a>
          </div>
          <div className="slider-content-item row active">
            <div className="slider-content-item-right">
              {data5.length > 0 && data5[currentImageIndex] && (
                <img src={`./../upload/${data5[currentImageIndex].hinhAnh}`} alt="" />
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="cartegory">
        <div className="container">
          <div className="cartegory-content row">
            <div className="cartegory-item">
              <img src="../image/vip1.jpg" alt="" />
              <h2>
                <a href="../html/nuochoanu.html">Nước hoa nữ</a>
              </h2>
            </div>
            <div className="cartegory-item">
              <img src="../image/vip2.webp" alt="" />
              <h2>
                {" "}
                <a href="../html/nuochoanam.html">Nước hoa Nam</a>
              </h2>
            </div>
            <div className="cartegory-item">
              <img src="../image/vip3.jpg" alt="" />
              <h2>
                <a href="../html/mypham.html">Mỹ Phẩm</a>
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section className="product">
        <div className="container">
          <h1 className="title_h1">Sản Phẩm</h1>
          <div className="product-items">

            <h2 className="title_h2">Sản phẩm bán chạy</h2>
            {/* sanpham */}
            {data4.map(function (value, index) {
              return (
                <div key={index} className="boxsp1">
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
                    <p className="gia" style={{color:'red'}}> {value.gia ? value.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}</p>
                    <p className="giacu">{value.giaGiam ? value.giaGiam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}</p>

                    <span className="giamgia" style={{ marginLeft: '1px' }}>
                      {value.gia && value.giaGiam ? (
                        `-${Math.round(((value.giaGiam - value.gia) / value.giaGiam) * 100)}%`
                      ) : 'N/A'}
                    </span>
                  </div>
                </div>
              )
            })}
            <h2 className="title_h2">Nước Hoa Nam</h2>
            {/* sanpham */}
            {data1.map(function (value, index) {
              
              return (
                <div key={index} className="boxsp1">
                  <a href={"/thongtinsp/" + value.maSanPham}>
                    <img
                      src={"./../upload/" + value.anhDaiDien}
                      alt="error"
                    />
                  </a>
                  <a href={"/thongtinsp/" + value.maSanPham} className="titlettsp">
                    {value.tenSanPham}
                    <br />

                  </a>
                  <div className="giattsp">
                    <p className="gia"> {value.gia ? value.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'} </p>
                    <p className="giacu">{value.giaGiam ? value.giaGiam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}</p>
                    <span className="giamgia" style={{ marginLeft: '0px' }}>
                      {value.gia && value.giaGiam ? (
                        `-${Math.round(((value.giaGiam - value.gia) / value.giaGiam) * 100)}%`
                      ) : 'N/A'}
                    </span>
                  </div>
                </div>
              )
            })}

            <h2 className="title_h2">Nước Hoa Nữ</h2>
            {/* sanpham */}
            {data2.map(function (value, index) {
              return (
                <div key={index} className="boxsp1">
                  <a href={"/thongtinsp/" + value.maSanPham}>
                    <img

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
                    <span className="giamgia" style={{ marginLeft: '5px' }}>
                      {value.gia && value.giaGiam ? (
                        `-${Math.round(((value.giaGiam - value.gia) / value.giaGiam) * 100)}%`
                      ) : 'N/A'}
                    </span>
                  </div>
                </div>
              )
            })}
            <h2 className="title_h2">Combo</h2>
            {/* sanpham */}
            {data3.map(function (value, index) {
              return (
                <div key={index} className="boxsp1">
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
                    <span className="giamgia" style={{ marginLeft: '5px' }}>
                      {value.gia && value.giaGiam ? (
                        `-${Math.round(((value.giaGiam - value.gia) / value.giaGiam) * 100)}%`
                      ) : 'N/A'}
                    </span>
                  </div>
                </div>
              )
            })}

          </div>
          <h1 className="title_h1">Thương hiệu</h1>
          <div className="thuonghieu">
            <img src="../image/thuonghieu.png"></img>
          </div>
        </div>

      </section>

    </div>

  )
}

export default Home;


