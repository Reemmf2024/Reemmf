const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;  // تأكد من استخدام PORT المناسب في بيئة Render

const cors = require('cors');

// مهم جداً!
app.use(cors());
app.use(express.json());

app.post('/submit-form', (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log("بيانات وصلت:", name, email, subject, message);

  // رد بسيط للتأكيد
  res.json({ message: "تم استلام الرسالة بنجاح!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// إعدادات قراءة البيانات من الفورم
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname)));

// الاتصال بقاعدة البيانات MongoDB باستخدام المتغير البيئي MONGO_URI
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// إنشاء Schema و Model للرسائل
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
});

const Message = mongoose.model('Message', messageSchema);

// لتخزين آخر رسالة (من قاعدة البيانات)
app.post('/send-message', (req, res) => {
  const { name, email, subject, message } = req.body;

  // إنشاء رسالة جديدة في قاعدة البيانات
  const newMessage = new Message({ name, email, subject, message });

  newMessage.save()
    .then(() => {
      console.log("Message saved to database");
      res.sendFile(path.join(__dirname, 'index.html'));  // العودة لصفحة الـ Index بعد الإرسال
    })
    .catch((err) => {
      console.error("Error saving message:", err);
      res.status(500).send("Error saving message");
    });
});

// إرسال آخر رسالة من قاعدة البيانات
app.get('/last-message', (req, res) => {
  Message.find().sort({ _id: -1 }).limit(1)  // الحصول على أحدث رسالة
    .then((message) => {
      res.json(message); // 
    })
    .catch((err) => {
      console.error("Error fetching last message:", err);
      res.status(500).send("Error fetching last message");
    });
});

// صفحة رئيسية
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
