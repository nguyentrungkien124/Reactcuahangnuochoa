import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import "../assets/css/nuochoanam.css"
export const Search = function () {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tukhoa = searchParams.get("tukhoa");
    const [sanphams, setSanPhams] = useState([])
    var obj = {
        page: 1,
        pageSize: 20,
        TenSanPham: tukhoa
    }
    useEffect(() => {
        async function loadData() {
            try {

                let ketqua = await axios.post("https://localhost:44395/api/SanPham/search2", obj)

                setSanPhams(ketqua.data.data)
            }
            catch {
                setSanPhams([])
            }
        }
        loadData()
    }, [tukhoa])

    return <>
        <div className="sanpham" style={{ color: "tomato" }}>
            Kết quả tìm kiếm với từ khóa : {tukhoa}
        </div>
        <div className="containersp1">
            {/* sản phẩm */}
            {sanphams.length > 0 && sanphams.map(function (value, index) {
                return (
                    <div key={index} className="boxsp">
                        <a href={"/thongtinsp/" + value.maSanPham}>
                            <img src={"./../upload/" + value.anhDaiDien} alt="error" />
                        </a>

                        <a href={"/thongtinsp/" + value.maSanPham} className="titlettsp">
                            {value.tenSanPham}
                            <br />
                        </a>
                        <div className="giattsp">
                            <p className="gia">{value.gia ? value.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'} </p>
                            <p className="giacu">{value.giaGiam ? value.giaGiam.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A'}</p>
                            <span className="giamgia">-15%</span>
                        </div>
                    </div>
                )
            })}
        </div>
    </>;
};


