//<!-- BẢO MẬT -->
// <!-- khóa chế độ xem chiều ngang trên điện thoại -->
// window.addEventListener("orientationchange", function () {
//     if (window.orientation === 90 || window.orientation === -90) {
//         alert("Chế độ xem chiều ngang bị khóa!");
//     }
// });

// <!-- Chức năng chặn kiểm tra code cơ bản -->
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

// Kiểm tra chế độ xem chiều ngang trên iPad
function checkOrientation() {
    if (window.innerWidth > window.innerHeight) {
        alert("Chế độ xem chiều ngang bị khóa!");
    }
}

// Thêm sự kiện cho sự thay đổi kích thước cửa sổ
window.addEventListener("resize", checkOrientation);

// Kiểm tra chế độ xem ban đầu
checkOrientation();

// Kiểm tra chế độ xem trên iPad Pro
function checkOrientation() {
    var isiPadPro = window.matchMedia("(min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2)").matches;

    if (isiPadPro) {
        if (window.innerWidth > window.innerHeight) {
            alert("Trang web không hỗ trợ cho iPad Pro");
            return false;
        }
    }
    return true;
}

// Thêm sự kiện cho sự thay đổi kích thước cửa sổ
window.addEventListener("resize", checkOrientation);

// Kiểm tra chế độ xem ban đầu
checkOrientation();


// document.addEventListener('selectstart', function(e) {
//     e.preventDefault();
// });

// <!-- Chặn ctrl+u -->
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
    }
});

// <!-- Chặn ctrl+shift+I -->
// Chặn sự kiện mở Developer Tools
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
    }
});

// Chặn chuột phải
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
}); 

// Kiểm tra xem trang được truy cập từ iPad hoặc máy tính bảng không
// function isTablet() {
//     return /iPad|Android/i.test(navigator.userAgent);
// }

// Hiển thị cảnh báo hoặc chuyển hướng người dùng nếu họ sử dụng máy tính bảng hoặc iPad
// function handleTabletView() {
//     if (isTablet()) {
//         alert("Trang web này không được hỗ trợ trên máy tính bảng hoặc iPad. Vui lòng sử dụng một thiết bị khác.");
//     }
// }

// Gọi hàm để xử lý chế độ xem khi trang được tải
// window.onload = function() {
//     handleTabletView();
// };

