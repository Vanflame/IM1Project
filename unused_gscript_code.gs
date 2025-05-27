function getAllData() {
    var sheetbook = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("BOOKINGS");
    var sheetorder = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ORDERS");

    var firebaseUrlBook = "https://im1project-default-rtdb.asia-southeast1.firebasedatabase.app/Booking.json"; 
    var responseBook = UrlFetchApp.fetch(firebaseUrlBook);
    var dataBook = JSON.parse(responseBook.getContentText());

    var firebaseUrlOrder = "https://im1project-default-rtdb.asia-southeast1.firebasedatabase.app/Orders.json";
    var responseOrder = UrlFetchApp.fetch(firebaseUrlOrder);
    var dataOrder = JSON.parse(responseOrder.getContentText());

    var existingDatabook = sheetbook.getDataRange().getValues(); // ✅ Fetch current booking data
    var existingDataOrder = sheetorder.getDataRange().getValues(); // ✅ Fetch current order data

    var headersbook = ["DATE", "TIME", "NAME", "EMAIL", "BOOK DATE", "TOTAL GUEST"];
    var headersorder = ["DATE", "TIME", "NAME", "ITEM", "PRICE", "QUANTITY", "TOTAL"];

    // ✅ Add headers if sheets are empty
    if (existingDatabook.length === 0) {
        sheetbook.appendRow(headersbook); 
    }
    if (existingDataOrder.length === 0) {
        sheetorder.appendRow(headersorder);
    }

    var newBookingEntries = [];
    var newOrderEntries = [];

    // ✅ Process Booking Data
    for (var key in dataBook) {
        var row = dataBook[key];

        var rowDataBook = [
            row.Datestamp || "N/A",
            row.Timestamp || "",
            row.Name || "N/A",
            row.Email || "N/A",
            row.Date || "N/A",
            row.Guests || "N/A"
        ];

        var existsbook = existingDatabook.some(existingRow => 
            existingRow[1] === rowDataBook[1] ||  // time
            existingRow[2] === rowDataBook[2] && // name
            existingRow[3] === rowDataBook[3]     // Email
        );

        if (!existsbook) {
            sheetbook.appendRow(rowDataBook);
            newBookingEntries.push(rowDataBook);
        }
    }

    // ✅ Process Order Data
    for (var key in dataOrder){
        var row = dataOrder[key];

        var rowDataOrder = [
            row.Datestamp || "N/A",
            row.Timestamp || "",
            row.Name || "",
            row.FoodName || "N/A",
            row.Price || "0",
            row.Quantity || "0",
            row.Total || "0"
        ];

        var existsorder = existingDataOrder.some(existingRow =>
            existingRow[2] === rowDataOrder[2] ||  // Name
existingRow[1] === rowDataOrder[1] //date
        );

        if (!existsorder) {
            sheetorder.appendRow(rowDataOrder);
            newOrderEntries.push(rowDataOrder);
        }
    }

    // ✅ Improved Logging Output
    Logger.log(
        "Data successfully fetched and updated!\n\n" +
        "Recent Booking Entries:\n" +
        (newBookingEntries.length > 0 ? JSON.stringify(newBookingEntries, null, 2) : "No new booking data added.") + "\n\n" +
        "Recent Order Entries:\n" +
        (newOrderEntries.length > 0 ? JSON.stringify(newOrderEntries, null, 2) : "No new order data added.")
    );
}



update error(duplicating last entry when delete the row)

function getAllData() {
    var sheetbook = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("BOOKINGS");
    var sheetorder = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("ORDERS");

    var firebaseUrlBook = "https://im1project-default-rtdb.asia-southeast1.firebasedatabase.app/Booking.json"; 
    var responseBook = UrlFetchApp.fetch(firebaseUrlBook);
    var dataBook = JSON.parse(responseBook.getContentText());

    var firebaseUrlOrder = "https://im1project-default-rtdb.asia-southeast1.firebasedatabase.app/Orders.json";
    var responseOrder = UrlFetchApp.fetch(firebaseUrlOrder);
    var dataOrder = JSON.parse(responseOrder.getContentText());

    var existingDatabook = sheetbook.getDataRange().getValues(); // ✅ Fetch current booking data
    var existingDataOrder = sheetorder.getDataRange().getValues(); // ✅ Fetch current order data

    var headersbook = ["DATE", "TIME", "NAME", "EMAIL", "BOOK DATE", "TOTAL GUEST"];
    var headersorder = ["DATE", "TIME", "NAME", "ITEM", "PRICE", "QUANTITY", "TOTAL"];

    // ✅ Add headers if sheets are empty
    if (existingDatabook.length === 0) {
        sheetbook.appendRow(headersbook); 
    }
    if (existingDataOrder.length === 0) {
        sheetorder.appendRow(headersorder);
    }

    // 🔥 Step 1: Remove Entries Missing from Firebase
for (var i = existingDatabook.length - 1; i > 0; i--) { 
    let rowName = existingDatabook[i][2]; // Name column in Google Sheets
    let existsInFirebase = Object.values(dataBook).some(row => row.Name === rowName);

    if (!existsInFirebase) {
        sheetbook.deleteRow(i + 1); // ✅ Delete row if it no longer exists in Firebase
    }
}

for (var i = existingDataOrder.length - 1; i > 0; i--) { 
    let rowName = existingDataOrder[i][2]; // Name column in Google Sheets
    let existsInFirebase = Object.values(dataOrder).some(row => row.Name === rowName);

    if (!existsInFirebase) {
        sheetorder.deleteRow(i + 1); // ✅ Delete row if it no longer exists in Firebase
    }
}

// 🔥 Step 2: Add or Update Entries from Firebase
var newBookingEntries = [];
var newOrderEntries = [];

for (var key in dataBook) {
    var row = dataBook[key];
    var rowDataBook = [row.Datestamp, row.Timestamp, row.Name, row.Email, row.Date, row.Guests];

    var rowIndex = existingDatabook.findIndex(existingRow => Array.isArray(existingRow) && existingRow[2] === rowDataBook[2]);

    if (rowIndex !== -1) {
        sheetbook.getRange(rowIndex + 1, 1, 1, rowDataBook.length).setValues([rowDataBook]); // ✅ Update existing row
    } else {
        sheetbook.appendRow(rowDataBook); // ✅ Append new row
        newBookingEntries.push(rowDataBook);
    }
}

for (var key in dataOrder) {
    var row = dataOrder[key];
    var rowDataOrder = [row.Datestamp, row.Timestamp, row.Name, row.FoodName, row.Price, row.Quantity,row.Total,row.Type, row.DatestampChange, row.TimestampChange ];

    var rowIndex = existingDataOrder.findIndex(existingRow => Array.isArray(existingRow) && existingRow[2] === rowDataOrder[2]);

    if (rowIndex !== -1) {
        sheetorder.getRange(rowIndex + 1, 1, 1, rowDataOrder.length).setValues([rowDataOrder]); // ✅ Update existing row
    } else {
        sheetorder.appendRow(rowDataOrder); // ✅ Append new row
        newOrderEntries.push(rowDataOrder);
    }
}

}

