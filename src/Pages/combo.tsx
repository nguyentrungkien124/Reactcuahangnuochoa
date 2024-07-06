import { useEffect, useState } from "react";
import "../assets/css/combo.css"
import axios from "axios";
import { Pagination } from "antd";

interface Product {
  maSanPham: string;
  tenSanPham: string;
  anhDaiDien: string;
  gia: number;
  giaGiam: number;
  soLuong: number;
}
const Combo = () => {
  const [data, setData] = useState<Product[]>([]);

  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [pagedb, setPagedb] = useState<number>(1);
  const [pageSizedb, setPageSizedb] = useState<number>(8);
  const [totalProductsdb, setTotalProductsdb] = useState<number>(0);
  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.post('https://localhost:44395/api/SanPham/search_ChuyenMuc', {
          page: pagedb.toString(),
          pageSize: pageSizedb,
          MaChuyenMuc: 3
        });


        setDisplayedProducts(response.data.data);
        console.log("da xong")
        setData(response.data.data)
        setTotalProductsdb(response.data.totalItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    loadData();
  }, [pagedb, pageSizedb]);

  const handlePageChange = (currentPage: number) => {
    setPagedb(currentPage);
    setPageSizedb(8);
  };
  return (
    <div>
      <main>
        <div
          className="thongtintrang"
          style={{
            marginLeft: "0%",
            marginTop: "1%",
            paddingLeft: "15%",
            background: "rgb(237, 237, 146)"
          }}
        >
          <a href="../html/index.html" style={{ color: "black", fontWeight: "bold" }}>
            Trang chủ
          </a>
          <span style={{ margin: "0 15px" }}>&gt;</span>
          <a
            href="../html/index.html"
            style={{ color: "rgb(221, 41, 41)", fontWeight: "bold" }}
          >
            Combo
          </a>
        </div>
        <div>
          <img src="../image/Screenshot 2023-11-23 234824.png" alt="" />
        </div>
        <div className="tittlecombo">
          Combo giảm giá của chúng tôi luôn giảm giá kịch sàn khi khách hàng mua theo
          combo. Giá rẻ nhất vịnh Bắc Bộ .........
        </div>
        <div className="sanpham" style={{ color: "tomato" }}>
          ❤ Combo giảm giá❤
        </div>
        <div className="containersp">
          {/* sản phẩm */}
          {displayedProducts.map((value, index) => (
            <div key={index} className="boxsp3">
              <a href={"/thongtinsp/" + value.maSanPham}>
                <img src={"./../upload/" + value.anhDaiDien} alt="error" />
              </a>
              <a href={"/thongtinsp/" + value.maSanPham} className="titlettsp">
                {value.tenSanPham}
              </a>
              <div className="giattsp6">
                <p className="gia">{value.gia ? value.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'} </p>
                <p className="giacu">{value.giaGiam ? value.giaGiam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}</p>
                <span className="giamgia">
                  {value.gia && value.giaGiam ? (
                    `-${Math.round(((value.giaGiam - value.gia) / value.giaGiam) * 100)}%`
                  ) : 'N/A'}
                </span>
              </div>
            </div>
          ))};

        </div>
        <Pagination
          current={pagedb} // Sử dụng pagedb thay vì page
          total={totalProductsdb} // Sử dụng totalProductsdb thay vì totalProducts
          pageSize={pageSizedb} // Sử dụng pageSizedb thay vì pageSize
          onChange={handlePageChange}
          style={{ textAlign: 'center' }}
        />

      </main>

    </div>
  )
}

export default Combo