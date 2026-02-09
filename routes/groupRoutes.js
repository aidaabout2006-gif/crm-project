const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middlewares/auth'); // اضافه شد

// صفحه اصلی گروه‌ها
router.get('/', authMiddleware, groupController.showGroups);

// فرم افزودن گروه
router.get('/add', authMiddleware, (req, res) => res.render('groups/add'));

// عملیات CRUD
router.post('/add', authMiddleware, groupController.addGroup);
router.post('/update', authMiddleware, groupController.updateGroup);
router.post('/delete', authMiddleware, groupController.deleteGroup);

module.exports = router;
