document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Không tìm thấy User ID. Vui lòng thử lại!");
        return;
    }

    // Gọi API để lấy thông tin người dùng
    fetch(`/api/proxy/api/v1/user/get_user/${userId}`)
        .then(response => {
            if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu người dùng");
            return response.json();
        })
        .then(data => {
            document.getElementById("order-id").textContent = '#'+data.orderCode;
            document.getElementById("name").textContent = data.name;
            document.getElementById("email").textContent = data.email;
            document.getElementById("phone").textContent = data.phone;
            document.getElementById("account").textContent = data.stk;
            document.getElementById("bank").textContent = data.bankName;
            document.getElementById("tickets").textContent = data.ticketCount + " vé";
        })
        .catch(error => console.error("Lỗi khi lấy dữ liệu:", error));
});

// Xử lý sự kiện khi nhấn nút "Xác nhận thanh toán"
document.getElementById("confirm-btn").addEventListener("click", async function () {
    const userId = localStorage.getItem("userId");

    if (!userId) {
        alert("Không tìm thấy User ID. Vui lòng thử lại!");
        return;
    }

    try {
        // Gọi API để lấy URL thanh toán
        const response = await fetch(`/api/proxy/api/v1/user/get_pay_link/${userId}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Lỗi API: ${response.status} - ${response.statusText}`);
        }

        const paymentUrl = await response.text(); // Lấy URL từ API
        console.log("Chuyển hướng đến:", paymentUrl);

        if (paymentUrl) {
            window.location.href = paymentUrl.trim(); // Chuyển hướng trang
        } else {
            alert("Không nhận được URL thanh toán. Vui lòng thử lại.");
        }
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        alert("Lỗi khi lấy URL thanh toán. Vui lòng thử lại!");
    }
});
