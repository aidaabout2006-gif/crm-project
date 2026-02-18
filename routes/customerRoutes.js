// const express = require('express');
// const router = express.Router();
// const customerController = require('../controllers/customerController');
// //const authMiddleware = require('../middlewares/auth'); 
// const verifyToken = require('../middlewares/jwtAuth');  

// // صفحه اصلی مشتری‌ها
// //router.get('/', authMiddleware, customerController.showCustomers);
// router.get('/', verifyToken, customerController.showCustomers);


// router.get('/add', verifyToken, (req, res) => res.send('برای افزودن مشتری باید فرم POST ارسال شود'));
// router.get('/all', verifyToken, (req, res) => res.send('برای دریافت همه مشتری‌ها باید POST ارسال شود'));
// router.get('/delete', verifyToken, (req, res) => res.send('برای حذف مشتری باید فرم POST ارسال شود'));
// router.get('/update', verifyToken, (req, res) => res.send('برای ویرایش مشتری باید فرم POST ارسال شود'));
// router.get('/api', verifyToken, customerController.getAllCustomers);
// // نمایش فرم ویرایش مشتری
// router.get('/edit/:id', verifyToken, customerController.showEditCustomer);

// // CRUD
// router.post('/add', verifyToken, customerController.addCustomers);
// router.post('/delete', verifyToken, customerController.deleteCustomers);
// router.post('/update', verifyToken, customerController.updateCustomers);

// module.exports = router;


const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const verifyToken = require('../middlewares/jwtAuth');  

// صفحه اصلی مشتری‌ها (محافظت شده با JWT)
router.get('/', verifyToken, customerController.showCustomers);

// مسیرهای GET برای اطلاع‌رسانی (اجتناب از تغییر دیتابیس با GET)
router.get('/add', verifyToken, (req, res) => res.send('برای افزودن مشتری باید فرم POST ارسال شود'));
router.get('/all', verifyToken, (req, res) => res.send('برای دریافت همه مشتری‌ها باید POST ارسال شود'));
router.get('/delete', verifyToken, (req, res) => res.send('برای حذف مشتری باید فرم POST ارسال شود'));
router.get('/update', verifyToken, (req, res) => res.send('برای ویرایش مشتری باید فرم POST ارسال شود'));

// API برای دریافت همه مشتری‌ها
router.get('/api', verifyToken, customerController.getAllCustomers);

// نمایش فرم ویرایش مشتری
router.get('/edit/:id', verifyToken, customerController.showEditCustomer);

// عملیات CRUD مشتری‌ها (تمامی مسیرها با JWT محافظت شده)
router.post('/add', verifyToken, customerController.addCustomers);
router.post('/delete', verifyToken, customerController.deleteCustomers);
router.post('/update', verifyToken, customerController.updateCustomers);

module.exports = router;