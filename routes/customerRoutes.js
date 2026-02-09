const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middlewares/auth'); // اضافه شد

// صفحه اصلی مشتری‌ها
router.get('/', authMiddleware, customerController.showCustomers);

// پیام‌های راهنما (می‌تونی همونجا هم auth بذاری)
router.get('/add', authMiddleware, (req, res) => res.send('برای افزودن مشتری باید فرم POST ارسال شود'));
router.get('/all', authMiddleware, (req, res) => res.send('برای دریافت همه مشتری‌ها باید POST ارسال شود'));
router.get('/delete', authMiddleware, (req, res) => res.send('برای حذف مشتری باید فرم POST ارسال شود'));
router.get('/update', authMiddleware, (req, res) => res.send('برای ویرایش مشتری باید فرم POST ارسال شود'));

// نمایش فرم ویرایش مشتری
router.get('/edit/:id', authMiddleware, customerController.showEditCustomer);

// CRUD
router.post('/add', authMiddleware, customerController.addCustomers);
router.post('/delete', authMiddleware, customerController.deleteCustomers);
router.post('/update', authMiddleware, customerController.updateCustomers);

module.exports = router;
