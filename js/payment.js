
document.addEventListener("DOMContentLoaded", async function () {
    await loadBankList(); // Tải danh sách ngân hàng khi trang load
});

async function loadBankList() {
    const bankSearch = document.getElementById("bank-search");
    const bankList = document.getElementById("bank-list");
    const bankInput = document.getElementById("bank");

    if (!bankSearch || !bankList) return;

    try {
        
        const response = await fetch("https://api.vietqr.io/v2/banks");
        const result = await response.json();
        let banks = result.data || []; // Lưu danh sách ngân hàng

        function renderBankList(filter = "") {
            bankList.innerHTML = ""; // Xóa danh sách cũ

            let filteredBanks = banks.filter(bank =>
                bank.shortName.toLowerCase().includes(filter.toLowerCase())
            );

            if (filteredBanks.length === 0) {
                bankList.style.display = "none";
                return;
            }

            filteredBanks.forEach(bank => {
                const listItem = document.createElement("li");
                listItem.classList.add("dropdown-item");
                listItem.innerHTML = `
                    <img src="${bank.logo}" alt="${bank.shortName}" class="bank-logo">
                    <span>${bank.shortName}</span>
                `;

                listItem.addEventListener("click", () => {
                    bankSearch.value = bank.shortName; // Hiển thị tên ngân hàng đã chọn
                    bankInput.value = bank.id; // Lưu ID ngân hàng
                    bankList.style.display = "none"; // Ẩn danh sách sau khi chọn
                });

                bankList.appendChild(listItem);
            });

            bankList.style.display = "block";
        }

        // Chỉ hiển thị dropdown khi có sự kiện click hoặc nhập
        bankSearch.addEventListener("focus", function () {
            renderBankList(bankSearch.value);
        });

        bankSearch.addEventListener("input", function () {
            renderBankList(bankSearch.value);
        });

        document.addEventListener("click", function (event) {
            if (!bankSearch.contains(event.target) && !bankList.contains(event.target)) {
                bankList.style.display = "none"; // Ẩn danh sách khi click ra ngoài
            }
        });

    } catch (error) {
        console.error("Lỗi khi tải danh sách ngân hàng:", error);
    }
}

// Xử lý thanh toán khi nhấn nút
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("payment-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Ngăn form reload trang

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const stk = document.getElementById("stk").value;
        const bank = document.getElementById("bank").value;

        if (!bank) {
            alert("Vui lòng chọn ngân hàng!");
            return;
        }

        const ticketCount = localStorage.getItem("ticketQuantity") || 0;

        const paymentData = {
            name: name,
            email: email,
            phone: phone,
            stk: stk,
            bankId: bank,
            ticketCount: parseInt(ticketCount)
        };

        try {
            
            const response = await fetch("/api/proxy/api/v1/user/create_user", {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentData)
            });

            if (!response.ok) {
                throw new Error(`Lỗi API: ${response.status} - ${response.statusText}`);
            }

            const userId = await response.text(); // Lấy dữ liệu trả về dưới dạng chuỗi
            console.log("User ID từ API:", userId);

            if (userId) {
                localStorage.setItem("userId", userId.trim()); // Lưu vào localStorage
                console.log("User ID đã lưu:", userId.trim());

                window.location.href = "./confirm.html"; // Chuyển hướng đến trang xác nhận
            } else {
                alert("Không nhận được userId. Vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            alert("Lỗi kết nối đến server. Vui lòng thử lại!");
        }

    });
});
