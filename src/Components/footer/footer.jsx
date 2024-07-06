import React from 'react';
import "../footer/footer.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


const Footer = () => {
  return (
    <div> 
        <div className="footer" >
          <div className="footer-content-row">
            <div className="footer-content-item">
              <h3>GIỚI THIỆU</h3>
              <p>Giới thiệu về TGNH</p>
              <p>Quan điểm kinh doanh</p>
              <p>Bản quyền &amp; Sở hữu</p>
            </div>
            <div className="footer-content-item">
              <h3>CHÍNH SÁCH CÔNG TY</h3>
              <p>Điều khoản sử dụng</p>
              <p>Chính sách bảo mật thông tin</p>
              <p>Chính sách vận chuyển, giao nhận kiểm hàng</p>
              <p>Chính sách bảo hành</p>
              <p>Chính sách đổi trả</p>
              <p>Nhượng Quyền Thương Hiệu</p>
              <p>Trả góp 0% qua thẻ tín dụng</p>
            </div>
            <div className="footer-content-item">
              <h3>TRỢ GIÚP</h3>
              <p>Hướng dẫn sử dụng nước hoa</p>
              <p>Hướng dẫn mua hàng</p>
              <p>Phương thức thanh toán</p>
              <p>Gói quà miễn phí</p>
            </div>
            <div className="footer-content-item">
              <h3>THÔNG TIN KHÁC</h3>
              <p>Hoạt động TGNH</p>
              <p>Member Card</p>
              <p>Gift Voucher</p>
              <p>Tuyển dụng</p>
            </div>
          </div>
          <div className="footer-content-social">
          <FontAwesomeIcon style={{marginLeft:10}} icon={faFacebook} />
          <FontAwesomeIcon style={{marginLeft:10}} icon={faYoutube} />
          <FontAwesomeIcon style={{marginLeft:10}} icon={faPhone} />
          <FontAwesomeIcon style={{marginLeft:10}} icon={faMapMarkerAlt} />
          </div>
          <div className="footer-img">
            <img src="image/footer-removebg-preview.png" alt="" />
          </div>
        </div>
    </div>
  )
};

export default Footer;
