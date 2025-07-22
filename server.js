const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// เสิร์ฟไฟล์ static (html, css, js)
app.use(express.static(__dirname));

// Root endpoint → แสดงหน้า index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// รับ POST จาก agreement.html
app.post("/submit", (req, res) => {
  const data = req.body;
  console.log("ได้รับข้อมูลจากแบบฟอร์ม:", data);
  fs.appendFile("log.json", JSON.stringify(data) + ",\n", (err) => {
    if (err) {
      res.status(500).send("บันทึกไม่สำเร็จ");
    } else {
      res.send("บันทึกเรียบร้อย");
    }
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`เซิร์ฟเวอร์จำลองเปิดที่ http://localhost:${PORT}`));
