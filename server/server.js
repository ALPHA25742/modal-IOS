import express from "express";
import multer from "multer";
import fs from 'fs'
import {dirname} from 'path'
import path from 'node:path';
import { fileURLToPath } from 'url';

const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // cb(null, file.originalname);
    cb(null, file.fieldname);
  },
});

const upload = multer({ storage: storage });
// const upload = multer({ dest: 'uploads/' });

// Route for file upload
app.post("/submit-pdf", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json("No file was uploaded.");
  }

  // Access the uploaded file
  const uploadedFile = req.file;

  // Process the file as needed
  // ...
  // console.log(req.body.filename);
  res.json("File uploaded successfully!");
});

app.get('/view-pdf', async(req, res) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(__dirname, 'uploads/file');
  const stat = fs.statSync(filePath);

  res.writeHead(200, {
    'Content-Type': 'application/pdf',
    'Content-Length': stat.size
  });

  const readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

// Start the server
app.listen(4000, () => {
  console.log("Server is running on port 3000");
});
