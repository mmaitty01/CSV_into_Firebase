const admin = require("firebase-admin");
const fs = require("fs");
const csv = require("csv-parser");

// Initialize Firebase Admin
const serviceAccount = require("./amshop-61d4a-firebase-adminsdk-fbsvc-a056cfbef0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const uploadCsvToFirestore = async (csvFilePath, collectionName) => {
  try {
    const data = [];
    // อ่านไฟล์ CSV
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        data.push(row);
      })
      .on("end", async () => {
        console.log("CSV file successfully read.");
        const batch = db.batch();
        data.forEach((doc) => {
          const docRef = db.collection(collectionName).doc(doc.id); // ใช้ id เป็น document id
          batch.set(docRef, doc);
        });
        await batch.commit();
        console.log("Data successfully uploaded to Firestore.");
      });
  } catch (error) {
    console.error("Error uploading CSV to Firestore:", error);
  }
};

// เรียกใช้ฟังก์ชัน
uploadCsvToFirestore("AM.csv", "amShopDB"); // แทน "data.csv" ด้วยชื่อไฟล์ของคุณ และ "users" ด้วยชื่อ collection ที่ต้องการ
