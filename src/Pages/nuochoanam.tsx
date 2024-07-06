import "../assets/css/nuochoanam.css"
import { useEffect, useState } from "react";
import { Pagination } from 'antd';
import axios from "axios";

interface Product {
    maSanPham: string;
    tenSanPham: string;
    anhDaiDien: string;
    gia: number;
    giaGiam: number;
    soLuong: number;
}

const Nuochoanam = () => {
    // const [data, setData] = useState<Product[]>([]);

    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [pagedb, setPagedb] = useState<number>(1);
    const [pageSizedb, setPageSizedb] = useState<number>(20);
    const [totalProductsdb, setTotalProductsdb] = useState<number>(0);
    //  chúng ta đang sử dụng biến totalProductsdb để biết tổng số sản phẩm.


    useEffect(() => {
        async function loadData() {
            try {
                const response = await axios.post('https://localhost:44395/api/SanPham/search_ChuyenMuc', {
                    page: pagedb.toString(),
                    pageSize: pageSizedb,
                    MaChuyenMuc: 1
                });

                // setData(response.data.data);

                setDisplayedProducts(response.data.data);
                console.log("da xong")
                // setData(response.data.data)

                setTotalProductsdb(response.data.totalItems); // Corrected line
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        loadData();

    }, [pagedb, pageSizedb]);
    console.log(pageSizedb)

    const handlePageChange = (currentPage: number) => {
        setPagedb(currentPage);
        setPageSizedb(20);
    };


    return (
        <>
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
                        style={{ color: "rgb(242, 44, 44)", fontWeight: "bold" }}
                    >
                        Nước hoa nam
                    </a>
                </div>
                <div>
                    <img src="../image/Screenshot 2023-11-23 234824.png" alt="" />
                </div>
                <div className="tittlenuochoanam">
                    Việc sử dụng nước hoa nam là một quyết định cá nhân và có thể có nhiều lý do
                    khác nhau tùy thuộc vào sở thích và mục đích sử dụng.Hương thơm và phong
                    cách nước hoa nam có thể tạo ra một hương thơm đặc trưng và mang tính chất
                    cá nhân. Hương thơm từ nước hoa có thể giúp tăng cường sự tự tin, tạo ấn
                    tượng và thể hiện phong cách riêng của một người.Tạo dấu ấn và nhận dạng một
                    mùi hương đặc trưng có thể trở thành dấu ấn riêng biệt của một người. Khi
                    một người khác gặp lại mùi hương đó, nó có thể kích thích ký ức và gợi lại
                    hình ảnh của người sử dụng nước hoa, giúp tạo nên sự nhận dạng và gắn kết.
                </div>
                <div className="sanpham" style={{ color: "tomato" }}>
                    ❤Nước hoa nam❤
                </div>
                <div className="containersp1">
                    {/* sản phẩm */}
                    {displayedProducts.map((value, index) => (
                        <div key={index} className="boxsp">
                            <a href={"/thongtinsp/" + value.maSanPham}>
                                <img src={"./../upload/" + value.anhDaiDien} alt="error" />
                            </a>
                            <a href={"/thongtinsp/" + value.maSanPham} className="titlettsp">
                                {value.tenSanPham}
                                <br />
                            </a>
                            <div className="giattsp">
                                <p className="gia">
                                    {value.gia ? value.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}
                                </p>
                                <p className="giacu">
                                    {value.giaGiam ? value.giaGiam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}
                                </p>
                                <span className="giamgia">
                                    {value.gia && value.giaGiam ? (
                                        `-${Math.round(((value.giaGiam - value.gia) / value.giaGiam) * 100)}%`
                                    ) : 'N/A'}
                                </span>

                            </div>
                        </div>
                    ))}

                </div>
                <Pagination
                    current={pagedb} // Sử dụng pagedb thay vì page
                    total={totalProductsdb} // chúng ta đang sử dụng biến totalProductsdb để biết tổng số sản phẩm.
                    pageSize={pageSizedb} // Sử dụng pageSizedb thay vì pageSize
                    onChange={handlePageChange}
                    style={{ textAlign: 'center' }}
                />

            </main>

        </>
    );
}

export default Nuochoanam