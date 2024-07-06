import React, { useState } from 'react';
import axios from 'axios';
import '../Components/login/login.css'; // Nhập file CSS
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const Navigate= useNavigate() 
  const handleLoginSuccess = () => {
    // Xử lý sau khi đăng nhập thành công
    console.log("Đăng nhập thành công!");
    // Sử dụng hook useNavigate để chuyển hướng về trang Home
    Navigate('/');
  };

    const handleLogin = async () => {
     
        try {
            const response = await axios.post('https://localhost:44381/api/UserControllers/login', {
                username,
                password
            });

            if (response.status === 200) {
                // Đăng nhập thành công
                console.log('Đăng nhập thành công:', response.data);
                localStorage.setItem('username',JSON.stringify(username));
                notification.success({
                    message: 'Đăng nhập thành công',
                    description: 'Xin chào mừng bạn đến với cửa hàng cửa chúng tôi',
                    placement: 'top',
                    duration: 2 // Thông báo tự động biến mất sau 3 giây
                  });
                // Gọi onLoginSucess khi đăng nhập thành công
                  window.location.href='/'

                // console.log(response.data)
                localStorage.setItem('matk',JSON.stringify(response.data.mataikhoan));
            } else {
                setError('Thông tin đăng nhập không chính xác');
            }
        } catch (error) {
            setError('Đã xảy ra lỗi khi đăng nhập');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2 className="login-title"> Login</h2>
                <div>
                    <label>Username:</label>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p className="login-error">{error}</p>}
            </form>
        </div>
    );
}

export default Login;
