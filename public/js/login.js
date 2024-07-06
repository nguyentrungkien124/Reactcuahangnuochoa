document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Ngăn chặn mặc định submit form

    // Lấy giá trị từ các trường đăng nhập
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Thực hiện kiểm tra đăng nhập
    if (username === "admin" && password === "1") {
        // Đăng nhập thành công, thực hiện hành động mong muốn (chuyển hướng, hiển thị thông báo, v.v.)
        alert("Đăng nhập thành công!");
        location.href="admin.html"
    } else {
        // Đăng nhập thất bại, hiển thị thông báo lỗi
        alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
});