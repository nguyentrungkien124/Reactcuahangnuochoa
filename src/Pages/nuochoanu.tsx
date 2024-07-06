import "../assets/css/nuochoanu.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from 'antd';
interface Product {
    maSanPham: string;
    tenSanPham: string;
    anhDaiDien: string;
    gia: number;
    giaGiam: number;
    soLuong: number;
}
const Nuochoanu = () => {
    const [data, setData] = useState<Product[]>([]);

    const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
    const [pagedb, setPagedb] = useState<number>(1);
    const [pageSizedb, setPageSizedb] = useState<number>(20);
    const [totalProductsdb, setTotalProductsdb] = useState<number>(0);

    useEffect(() => {
        async function loadData() {
            try {
                const response = await axios.post('https://localhost:44395/api/SanPham/search_ChuyenMuc', {
                    page: pagedb.toString(),
                    pageSize: pageSizedb,
                    MaChuyenMuc: 2
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
        setPageSizedb(20);
    };

    // const Nuochoanu = () => {
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
                        href="index.html"
                        style={{ color: "rgb(221, 41, 41)", fontWeight: "bold" }}
                    >
                        Nước hoa nữ
                    </a>
                </div>
                <div>
                    <img src="../image/Screenshot 2023-11-23 234824.png" alt="" />
                </div>
                <div className="tittlenuochoanu">
                    Nước hoa nữ là một sản phẩm phổ biến trong lĩnh vực làm đẹp và chăm sóc cá
                    nhân. Nó không chỉ tạo ra một mùi hương thơm dễ chịu trên cơ thể, mà còn có
                    những lợi ích tâm lý và xã hội.
                </div>
                <div className="sanpham" style={{ color: "tomato" }}>
                    ❤Nước hoa nữ❤
                </div>
                <div className="containersp">
                    {/* sản phẩm */}
                    {displayedProducts.map((value, index) => (
                        <div key={index} className="boxsp2">
                            <a href={"/thongtinsp/" + value.maSanPham}>
                                <img src={"./../upload/" + value.anhDaiDien} alt="error" />
                            </a>

                            <a href={"/thongtinsp/" + value.maSanPham} className="titlettsp">
                                {value.tenSanPham}
                                <br />
                            </a>
                            <div className="giattsp2">
                                <p className="gia2">{value.gia ? value.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'} </p>
                                <p className="giacu2">{value.giaGiam ? value.giaGiam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}</p>
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
                    total={totalProductsdb} // Sử dụng totalProductsdb thay vì totalProducts
                    pageSize={pageSizedb} // Sử dụng pageSizedb thay vì pageSize
                    onChange={handlePageChange}
                    style={{ textAlign: 'center' }}
                />

            </main>

        </div>
    )
}

export default Nuochoanu