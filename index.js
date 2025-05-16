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
    let now = new Date();

    //formatting time
    let formattedTime = now.getHours().toString().padStart(2, '0') + ":" +
        now.getMinutes().toString().padStart(2, '0') + ":" +
        now.getSeconds().toString().padStart(2, '0');

    // formatting date
    let formattedDate = (now.getMonth() + 1).toString().padStart(2, '0') + "/" +
        now.getDate().toString().padStart(2, '0') + "/" +
        now.getFullYear();



    let totalPrice = foodPrice * quantity;

    let orderData = {
        Datestamp: formattedDate,
        Timestamp: formattedTime,
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

}

// ✅ Book Save Function - Firebase & Google Sheets

function book_save() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;
    let guests = document.getElementById("guests").value;
    let now = new Date();

    //formatting time
    let formattedTime = now.getHours().toString().padStart(2, '0') + ":" +
        now.getMinutes().toString().padStart(2, '0') + ":" +
        now.getSeconds().toString().padStart(2, '0');

    // formatting date
    let formattedDate = (now.getMonth() + 1).toString().padStart(2, '0') + "/" +
        now.getDate().toString().padStart(2, '0') + "/" +
        now.getFullYear();

    //formatting date entry from elementid ('date')
    let dateParts = date.split("-");
    let entrydate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;

    let bookingData = {
        Datestamp: formattedDate,
        Timestamp: formattedTime,
        Type: "Booking",
        Name: name,
        Email: email,
        Date: entrydate,
        Guests: guests,
    };

    console.log("book_save function is running!");

    set(ref(db, 'Booking/' + name), bookingData)
        .then(() => console.log("Booking saved successfully in Firebase!"))
        .catch(error => console.error("Error saving booking in Firebase:", error));

}


