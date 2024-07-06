import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Table } from 'antd';
import '../assets/css/lichdon.css'; // Import CSS

const { Search } = Input;

const Lichsudh = () => {
  const mataikhoan = JSON.parse(localStorage.getItem('matk')!);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.post(`https://localhost:44395/api/HoaDonBan/Tìm hóa đơn?id=${mataikhoan}`);
      // Sắp xếp kết quả theo ngày tạo, mới nhất lên đầu
      const sortedResults = response.data.sort((a: any, b: any) => new Date(b.ngayTao).getTime() - new Date(a.ngayTao).getTime());
      setSearchResults(sortedResults);

      console.log(sortedResults);
    } catch (error) {
      console.error('Error searching for order history:', error);
    }
  };

  useEffect(() => { 
    handleSearch();
  }, []);

  const columns = [
    {
      title: 'Mã Hóa Đơn',
      dataIndex: 'maHoaDon',
      key: 'maHoaDon',
    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'ngayTao',
      key: 'ngayTao',
    },
    {
      title: 'Địa Chỉ Giao Hàng',
      dataIndex: 'diaChiGiaoHang',
      key: 'diaChiGiaoHang',
    },
    {
      title: 'Tổng Giá',
      dataIndex: 'tongGia',
      key: 'tongGia',
      render: (value: number) => (
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
      ),
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'tenSanPham',
      key: 'tenSanPham',
    },
    {
      title: 'Ảnh Đại Diện',
      dataIndex: 'anhDaiDien',
      key: 'anhDaiDien',
      render: (text: string) => <img src={"./../upload/" + text} alt="Product" className="product-image" />,
    },
    {
      title: 'Giá',
      dataIndex: 'gia',
      key: 'gia',
      render: (value: number) => (
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
      ),
    },
    {
      title: 'Số lượng ',
      dataIndex: 'soLuong',
      key: 'soLuong',
    },
    {
      title: 'Trạng thái đơn hàng',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (text: number) => {
        switch (text) {
          case 1:
            return 'Chờ xác nhận';
          case 0:
            return 'Đã xác nhận';
          case 3:
            return 'Đang giao hàng';
          case 4:
            return 'Đã giao hàng';
          default:
            return 'Không xác định';
        }
      },
    },
  ];

  return (
    <div className="order-history-container">
      <h1 className="title" style={{color:'aqua'}}>Lịch sử đơn hàng</h1>
      <Table columns={columns} dataSource={searchResults} className="order-table" />
    </div>
  );
};

export default Lichsudh;
