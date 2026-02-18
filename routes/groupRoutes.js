// const express = require('express');
// const router = express.Router();
// const groupController = require('../controllers/groupController');
// const verifyToken = require('../middlewares/jwtAuth'); // جایگزین auth قدیمی

// // صفحه اصلی گروه‌ها
// router.get('/', verifyToken, groupController.showGroups);

// // فرم افزودن گروه
// router.get('/add', verifyToken, (req, res) => res.render('groups/add'));

// // عملیات CRUD
// router.post('/add', verifyToken, groupController.addGroup);
// router.post('/update', verifyToken, groupController.updateGroup);
// router.post('/delete', verifyToken, groupController.deleteGroup);
// router.get('/api', verifyToken, groupController.getAllGroups);

// module.exports = router;


const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const verifyToken = require('../middlewares/jwtAuth'); // JWT 

// صفحه اصلی گروه‌ها
router.get('/', verifyToken, groupController.showGroups);

// فرم افزودن گروه
router.get('/add', verifyToken, (req, res) => res.render('groups/add'));

// عملیات CRUD (محافظت شده با JWT)
router.post('/add', verifyToken, groupController.addGroup);
router.post('/update', verifyToken, groupController.updateGroup);
router.post('/delete', verifyToken, groupController.deleteGroup);

// API برای دریافت همه گروه‌ها
router.get('/api', verifyToken, groupController.getAllGroups);

module.exports = router;