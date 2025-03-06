const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "dannie",
    password: "35946",
    database: "tomorroland_db",
    port: 3307
});

db.connect((err) => {
    if (err) {
        console.error("Error conectando a MySQL:", err);
        return;
    }
    //console.log("Conectado a MySQL");
});

module.exports = db;
