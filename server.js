const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// เปิด static สำหรับหน้าเว็บ
app.use(express.static(__dirname));

// Root endpoint
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// รับข้อมูลฟอร์ม
app.post("/submit", (req, res) => {
  const data = req.body;
  console.log("ได้รับข้อมูล:", data);

  fs.appendFile("log.json", JSON.stringify(data) + ",\n", (err) => {
    if (err) {
      res.status(500).send("บันทึกไม่สำเร็จ");
    } else {
      res.send("บันทึกเรียบร้อย");
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));