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

    for (var key in dataBook) {
        var row = dataBook[key];

        // ✅ Booking Data
        var rowDataBook = [
            row.Datestamp || "N/A",
            row.Timestamp || "",
            row.Name || "N/A",
            row.Email || "N/A",
            row.Date || "N/A",
            row.Guests || "N/A"
        ];

        var existsbook = existingDatabook.some(existingRow => 
            existingRow[2] === rowDataBook[2] &&  // Name
            existingRow[3] === rowDataBook[3] &&  // Email
            existingRow[4] === rowDataBook[4]     // Book Date
        );
            
      
        if (!existsbook) {
            sheetbook.appendRow(rowDataBook);
        }

    }

    for (var key in dataOrder){
      var row = dataOrder[key];

        // ✅ Order Data
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
            existingRow[2] === rowDataOrder[2] &&  // Name
            existingRow[3] === rowDataOrder[3] &&  // Item
            existingRow[4] === rowDataOrder[4] &&    // Price
            existingRow[5] === rowDataOrder[5] //Quantity
        );

        if (!existsorder) {
            sheetorder.appendRow(rowDataOrder);
        }
    }

    Logger.log("Data successfully fetched and updated!");
}
