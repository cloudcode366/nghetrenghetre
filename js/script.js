document.addEventListener("DOMContentLoaded", function () {
    const minusBtn = document.getElementById("button-addon1");
    const plusBtn = document.getElementById("button-addon2");
    const inputField = document.querySelector(".form-control");
    const buyNowBtn = document.querySelector(".btn-warning");

    // Tăng giảm số lượng vé
    minusBtn.addEventListener("click", function () {
        let currentValue = parseInt(inputField.value) || 0;
        if (currentValue > 0) {
            inputField.value = currentValue - 1;
        }
    });

    plusBtn.addEventListener("click", function () {
        let currentValue = parseInt(inputField.value) || 0;
        inputField.value = currentValue + 1;
    });

    // Lưu số lượng vé vào localStorage khi nhấn Buy now
    buyNowBtn.addEventListener("click", function () {
        const ticketQuantity = parseInt(inputField.value) || 0;
        localStorage.setItem("ticketQuantity", ticketQuantity);
    });
});
