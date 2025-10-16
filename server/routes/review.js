const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/auth');
const {
  uploadCode,
  getReviewHistory,
  getReviewById,
  uploadCodeGuest,
} = require('../controllers/reviewController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.go', '.rs'];
  const ext = file.originalname.substring(file.originalname.lastIndexOf('.')).toLowerCase();
  
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/guest-upload', upload.single('codeFile'), uploadCodeGuest);
router.use(authMiddleware);

router.post('/upload', upload.single('codeFile'), uploadCode);

router.get('/history', getReviewHistory);

router.get('/:id', getReviewById);

module.exports = router;