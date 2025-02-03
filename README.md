# Import CSV into Firebase Firestore with Node.js
**Firestore** เป็น Scalable NoSQL Cloud database มีการจัดเก็บข้อมูลในรูปแบบ Collection และ Document
<p align="center"><img width = "400" src = "https://github.com/user-attachments/assets/31ddcdc9-746e-48bc-8a85-11c88236f2f9"/></p>

## 1. เตรียมไฟล์ CSV
สร้างไฟล์ .csv โดยมีโครงสร้างที่เหมาะสม เช่น:
<p align="center"><img src = "https://github.com/user-attachments/assets/f7786644-217d-4b66-981a-d53e5ed9892f"/></p>

## 2. สร้าง Firebase Admin SDK Service Account Key ใน Firebase Console
1. เข้าไปที่ Firebase Console ไปที่ Firebase Console และเลือกโปรเจกต์ของเรา
   - หากยังไม่มีโปรเจกต์ ให้สร้างโปรเจกต์ใหม่โดยคลิก "Add project"
2. เข้าสู่หน้า Settings ที่มุมซ้ายบน คลิก Settings ⚙️ > Project settings
   - เมื่อเราเข้ามาในหน้า Project settings ให้เลือกแท็บ Service accounts
3. ดาวน์โหลด Service Account Key ในส่วนของ Firebase Admin SDK คลิกปุ่ม Generate new private key ระบบจะถามยืนยัน ให้คลิก Generate key โดยเราจะได้ไฟล์ JSON ที่เป็นคีย์ของ Service Account จะถูกดาวน์โหลดอัตโนมัติ (ชื่อไฟล์อาจเป็น project-name-firebase-adminsdk-xxxxx.json)

## 3. ไฟล์สคริปต์สำหรับอัปโหลด
โดยใช้ Node.js ในการอัปโหลดไฟล์ CSV ไปยัง Firestore 
- download `upload.js`ลงในโฟลเดอร์เดียวกันกับไฟล์ CSV และไฟล์ json แล้วเปลี่ยนข้อมูลเป็นของตัวเองในส่วนของ
``` js
const serviceAccount = require("./serviceAccountKey.json"); //ชื่อไฟล์ไฟล์ json ของเรา
```
และ
``` js
uploadCsvToFirestore("data.csv", "amShopDB"); // แทน "data.csv" ด้วยชื่อไฟล์ของเรา และ "uamShopDB" ด้วยชื่อ collection ที่ต้องการ
```
## 4. ตรวจสอบการตั้งค่าของ Firestore
เมื่อเราเตรียมข้อมูลสำหรับการอัปโหลดเรียบร้อยแล้ว โดยมีไฟล์ข้อมูล .CSV , ไฟล์ Service Account Key .json และไฟล์ upload.js ให้มาตั้งค่า Firestore Rules เพื่อให้แอปหรือโปรเจกต์ของเราสามารถเขียนข้อมูลได้ในช่วงที่กำลังพัฒนา
1. ไปที่ Firestore Database > Rules
2. แก้ไขให้เป็น true
<p align="center"><img src = "https://github.com/user-attachments/assets/24341fe1-7835-44e7-a0f3-55485484ffda"/></p>
3 เมื่อเสร็จแล้ว ให้ตั้งค่ากลับเป็นแบบปลอดภัยในภายหลัง

## 5. ติดตั้ง Firebase และเชื่อมต่อโปรเจกต์
เปิด cmd ในพื้นที่โฟลเดอร์โปรเจคของเรา จากนั้นให้ใช้คำสั่งดังนี้
1. เริ่มต้นโปรเจกต์ Node.js
``` 
npm init -y
```
2. ติดตั้ง Firebase Admin SDK และ csv-parser
```
npm install firebase-admin csv-parser
```
3. รันสคริปต์เพื่อส่งข้อมูลจาก .csv ไป Firestore 
```
node upload.js
```
## สรุป
ข้อมูลใน Firestore จะเป็นดังนี้ตามข้อมูลใน.csvของเรา
<p align="center"><img width = "600" src = "https://github.com/user-attachments/assets/2dd60585-e783-4b9a-af67-79efb7986a4d"/></p>
