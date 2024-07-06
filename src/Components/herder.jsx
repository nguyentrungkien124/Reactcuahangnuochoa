import "../assets/css/herder.css";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { useRecoilValue } from 'recoil';
import { cartState, totalQuantityCart } from '../hook/cartState'; // Đảm bảo import atom từ recoil
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input } from "antd";

const Herder = function () {
    const navigate = useNavigate();
    const [tukhoa, setTuKhoa] = useState();
    const username = JSON.parse(localStorage.getItem('username')) || '';

    function handleTimKiem() {
        navigate({
            pathname: '/search',
            search: `?tukhoa=` + tukhoa
        });
    }

    const handleLogout = () => {
        // Xóa thông tin đăng nhập từ localStorage
        localStorage.removeItem('username');
        localStorage.removeItem('matk');
        // Đưa người dùng về trang đăng nhập
        window.location.href = '/login';
    };

    // Chỉnh icon giỏ hàng
    const totalCart = useRecoilValue(totalQuantityCart);

    return (
        <div>
            <header>
                <div id="main">
                    <div id="herder">
                        <div className="herder-dau" style={{ textAlign: "center" }}>
                            <p style={{ fontSize: 20, fontFamily: 'auto' }}>
                                HỆ THỐNG PHÂN PHỐI NƯỚC HOA &amp; MỸ PHẨM CHÍNH HÃNG HÀNG ĐẦU VIỆT NAM
                                VỚI 50 CỬA HÀNG TRÊN TOÀN QUỐC
                            </p>
                        </div>
                    </div>
                    <div id="herder-2">
                        <div className="herder2tren">
                            <img src="../image/image.png" width={235} height={120} alt="ảnh logo" />

                            <Input
                                value={tukhoa}
                                placeholder="Tìm kiếm nước hoa hoặc nhãn hiệu"
                                onChange={(e) => setTuKhoa(e.target.value)}
                                style={{ width: '500px', top: '-69px' }}
                                // Biểu tượng tìm kiếm
                                suffix={
                                    <Button
                                        onClick={handleTimKiem}
                                        style={{
                                            border: 'none',
                                            background: 'transparent',
                                            padding: 0,
                                        }}
                                    >
                                        <SearchOutlined style={{ color: 'black' }} /> {/* Biểu tượng tìm kiếm */}
                                    </Button>
                                }
                            />

                            {/* Trường nhập với danh sách lựa chọn */}
                            <Input
                                type="text"
                                className="ipx"
                                list="item"
                                placeholder="Chọn nhãn hiệu"
                                style={{ marginLeft: '10px' }}
                            />
                            <datalist id="item">
                                <option value="nước hoa nam">nước hoa nam</option>
                                <option value="nước hoa nữ">nước hoa nữ</option>
                                <option value="nước hoa nam">nước hoa nam</option>
                                <option value="nước hoa nam">nước hoa nam</option>
                                <option value="nước hoa nam">nước hoa nam</option>
                            </datalist>

                            <h2 className="tk" style={{ marginBottom: '20px' }}>
                                <Link style={{ marginTop: 60 }} to="/giohang">
                                    <FontAwesomeIcon style={{ fontSize: 20 }} icon={faShoppingCart} />
                                    <span style={{ height: '1px', display: 'inline-block', verticalAlign: 'middle', color: 'red' }}>{totalCart}</span>
                                </Link>
                                {username === '' ? (
                                    <span>
                                        {username}
                                        <FontAwesomeIcon style={{ fontSize: 20, marginLeft: 20 }} icon={faUser} />
                                    </span>
                                ) : (
                                    <span style={{ fontFamily: 'serif', fontSize: 20, marginLeft: 20 }}>
                                        {username}
                                        <FontAwesomeIcon style={{ fontSize: 20, marginLeft: 10 }} icon={faSignOutAlt} onClick={handleLogout} />
                                    </span>
                                )}
                            </h2>
                        </div>
                    </div>

                    <div id="herder-3">
                        <div className="herderduoi">
                            <ul>
                                <li>
                                    <Link to="/" className="custom-link" style={{ fontSize: 25, fontWeight: 'bold' }}>
                                        Trang chủ
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/Nuochoanam" className="custom-link" style={{ fontSize: 20 }}>
                                        Nước hoa nam
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/Nuochoanu" className="custom-link" style={{ fontSize: 20 }}>
                                        Nước hoa nữ
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/Combo" className="custom-link" style={{ fontSize: 20 }}>
                                        Combo
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/Mypham" className="custom-link" style={{ fontSize: 20 }}>
                                        Mỹ phẩm
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/blog" className="custom-link" style={{ fontSize: 20 }}>
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="custom-link" style={{ fontSize: 20 }}>
                                        About
                                    </Link>
                                </li>
                                {username && (
                                    <li>
                                        <Link to="/lichsudh" className="custom-link" style={{ fontSize: 20 }}>
                                            Lịch sử đơn
                                        </Link>
                                    </li>
                                )}
                                <div
                                    className="hotline"
                                    style={{
                                        display: "inline-block",
                                        verticalAlign: "middle",
                                        marginLeft: 240,
                                        textAlign: "center"
                                    }}
                                >
                                    <i className="fa-solid fa-phone" /> Hotline Liên hệ:
                                    <br />
                                    0123 456 789
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>


        </div>
    )
};
export default Herder;
