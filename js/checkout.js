document.getElementById("check-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Ngăn chặn load lại trang

    const orderCode = document.getElementById("orderCode").value.trim();
    const statusElement = document.getElementById("status");
    
    if (!orderCode) {
        statusElement.textContent = "Vui lòng nhập mã đơn hàng!";
        statusElement.style.color = "red";
        return;
    }

    try {
        const response = await fetch(`/api/proxy/api/v1/user/check/${orderCode}`);
        if (!response.ok) {
            throw new Error("Không tìm thấy đơn hàng hoặc có lỗi xảy ra!");
        }
        const result = await response.text();
        
        statusElement.textContent = result;
    } catch (error) {
        statusElement.textContent = error.message;
        statusElement.style.color = "red";
    }
});
