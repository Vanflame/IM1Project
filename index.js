import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyCXJf5d9sCsjzgYLMZ4IcFTBWBg7RLWfMY",
    authDomain: "im1project.firebaseapp.com",
    databaseURL: "https://im1project-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "im1project",
    storageBucket: "im1project.firebasestorage.app",
    messagingSenderId: "141105773175",
    appId: "1:141105773175:web:4ce3fb9fcb8b0076262472"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


document.getElementById("order-now-submit").addEventListener("click", order_save);
document.getElementById("book-now-submit").addEventListener("click", book_save);


function order_save() {
    var item = document.getElementById('food-item');
    let selectedOption = item.options[item.selectedIndex];
    let foodName = selectedOption.value;
    let foodPrice = selectedOption.getAttribute("data-price");
    var quantity = document.getElementById('quantity').value;
    var name = document.getElementById('orderName').value;

    let totalPrice = foodPrice * quantity;

    let orderData = {
        Type: "Order",
        Name: name,
        FoodName: foodName,
        Price: foodPrice,
        Quantity: quantity,
        Total: totalPrice
    };

    console.log("order_save function is running!");

    // 🔥 Save to Firebase
    set(ref(db, 'Orders/' + name), orderData)
        .then(() => console.log("Order saved successfully in Firebase!"))
        .catch(error => console.error("Error saving order in Firebase:", error));

    // 🔥 Send to Google Sheets
    sendToGoogleSheets(orderData);
}

// ✅ Book Save Function - Firebase & Google Sheets

function book_save() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;
    let guests = document.getElementById("guests").value;

    let bookingData = {
        Type: "Booking",
        Name: name,
        Email: email,
        Date: date,
        Guests: guests
    };

    console.log("book_save function is running!");

    // 🔥 Save to Firebase
    set(ref(db, 'Booking/' + name), bookingData)
        .then(() => console.log("Booking saved successfully in Firebase!"))
        .catch(error => console.error("Error saving booking in Firebase:", error));

    // 🔥 Send to Google Sheets
    sendToGoogleSheets(bookingData);
}

// ✅ Universal Function to Send Data to Google Sheets
function sendToGoogleSheets(data) {
    let formData = new FormData();

    for (let key in data) {
        formData.append(key, data[key]); // Append all key-value pairs dynamically
    }

    fetch("https://script.google.com/macros/s/AKfycbxSTf1E8oF4XnPcV-66k_RfuPiIzNbuFmBo2ETvCN7Xxz-su3CA8Emm3UOIW8N0zz8XGw/exec", {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(data => console.log("Data sent to Google Sheets:", data))
        .catch(error => console.error("Error sending data to Google Sheets:", error));
}


