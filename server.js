
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`เซิร์ฟเวอร์จำลองเปิดที่ http://localhost:${PORT}`));