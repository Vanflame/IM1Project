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


function order_save() {


    var item = document.getElementById('food-item');
    let selectedOption = item.options[item.selectedIndex]; // Corrected foodItem reference
    let foodName = selectedOption.value;
    let foodPrice = selectedOption.getAttribute("data-price");
    var total = document.getElementById('total-price').innerText;
    var quantity = document.getElementById('quantity').value;
    var name = document.getElementById('orderName').value;



    console.log("order_save function is running!");

    set(ref(db, 'Orders/' + name), {
        Name: name,
        FoodName: foodName,
        Price: foodPrice,
        Quantity: quantity,
        Total: (foodPrice * quantity)
    })
        .then(() => {
            console.log("Order saved successfully!");
        }).catch(error => {
            console.error("Error saving order:", error);
        });


}

document.getElementById("book-now-submit").addEventListener("click", book_save);


function book_save() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let date = document.getElementById("date").value;
    let guests = document.getElementById("guests").value;

    set(ref(db, 'Booking/' + name), {
        Name: name,
        Email: email,
        Date: date,
        Guests: guests
    })
        .then(() => {
            console.log("Booking created successfully!");
        }).catch(error => {
            console.error("Error creating booking:", error);
        });;
}