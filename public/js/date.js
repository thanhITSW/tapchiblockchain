function updateDateTime() {
    const now = new Date();
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = now.toLocaleDateString('vi-VN', optionsDate);
    const formattedTime = now.toLocaleTimeString('vi-VN', optionsTime);
    document.getElementById('current-date').innerText = formattedDate;
    document.getElementById('current-time').innerText = formattedTime;
}

// Cập nhật ngày tháng và thời gian ngay lập tức khi trang tải
updateDateTime();

// Cập nhật ngày tháng và thời gian mỗi giây
setInterval(updateDateTime, 1000);