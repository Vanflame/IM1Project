document.querySelector(".menu-toggle").addEventListener("click", function() {
    document.querySelector(".nav-menu").classList.toggle("active");
});

function calculateTotal() {
    let foodItem = document.getElementById("food-item");
    let selectedOption = foodItem.options[foodItem.selectedIndex];
    let price = parseInt(selectedOption.getAttribute("data-price"));
    let quantity = parseInt(document.getElementById("quantity").value);
    
    document.getElementById("total-price").innerText = "₱" + (price * quantity);
}

document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let foodItem = document.getElementById("food-item").value;
    let quantity = document.getElementById("quantity").value;
    let totalPrice = document.getElementById("total-price").innerText;
    
    alert(`Order placed successfully!\nFood: ${foodItem}\nQuantity: ${quantity}\nTotal: ${totalPrice}`);
});
