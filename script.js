document.querySelector(".menu-toggle").addEventListener("click", function () {
    document.querySelector(".nav-menu").classList.toggle("active");
});

document.querySelectorAll(".hover").forEach(item => {
    item.addEventListener("click", function () {
        document.querySelector(".nav-menu").classList.remove("active");
    });
});


function calculateTotal() {
    let foodItem = document.getElementById("food-item");
    let selectedOption = foodItem.options[foodItem.selectedIndex];
    let price = parseInt(selectedOption.getAttribute("data-price"));
    let quantity = parseInt(document.getElementById("quantity").value);

    document.getElementById("total-price").innerText = "₱" + (price * quantity);
}

document.getElementById("order-form").addEventListener("submit", function (event) {
    event.preventDefault();
    let foodItem = document.getElementById("food-item").value;
    let quantity = document.getElementById("quantity").value;
    let totalPrice = document.getElementById("total-price").innerText;
    let orderName = document.getElementById('orderName').value;

    alert(`Order placed successfully!\nName: ${orderName} \nFood: ${foodItem}\nQuantity: ${quantity}\nTotal: ${totalPrice}`);
});

document.getElementById("book-form").addEventListener("submit", function (event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;
    let guests = document.getElementById("guests").value;

    alert(`Booking created successfully!\nName: ${name} \nEmail: ${email}\nDate: ${date}\nTotal Guest: ${guests}`);
});

function showSection(sectionId) {
    let allSections = document.querySelectorAll('.section');

    allSections.forEach(section => {
        section.classList.add('hidden'); // Hide all sections
        section.style.display = "none"; // Ensure they don't take up space
    });

    let activeSection = document.getElementById(sectionId);
    activeSection.classList.remove('hidden'); // Remove hidden class
    activeSection.style.display = "block"; // Make it visible


}

// Run the function on page load to display Home by default
window.onload = function () {
    showSection('home');
};
