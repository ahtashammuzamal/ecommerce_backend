import multer from "multer";

// Store file in memory buffer (we upload to Cloudinary, not disk)
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
