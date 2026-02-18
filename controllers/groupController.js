// const connection = require('../config/db');

// exports.addGroup = async(req, res) => {
//     const { group_name } = req.body;
//     const query = "INSERT INTO customer_groups (group_name) VALUES (?)";  
//     connection.query(query, [group_name], (err, result) => {
//         if (err) res.send("خطا در اضافه کردن گروه: " + err.message);
//         else res.send("گروه با موفقیت اضافه شد");
//     });
// };

// // exports.getAllGroups = (req, res) => {
// //     const query = "SELECT * FROM customer_groups";

// //     connection.query(query, (err, results) => {
// //         if(err) res.send("خطا در دریافت گروه‌ها: " + err.message);
// //         else res.json(results);
// //     });
// // };


// exports.getAllGroups = (req, res) => {
//     connection.query("SELECT * FROM customer_groups", (err, result) => {
//         if (err) return res.status(500).json({ error: "خطا" });
//         res.json(result);
//     });
// };

// exports.updateGroup = (req, res) => {
//     const { id, group_name } = req.body;
//     const query = "UPDATE customer_groups SET group_name = ? WHERE id = ?";
//     connection.query(query, [group_name, id], (err, result) => {
//         if(err) res.send("خطا در ویرایش گروه: " + err.message);
//         else res.send("گروه با موفقیت ویرایش شد");
//     });
// };

// exports.deleteGroup = (req, res) => {
//     const { id } = req.body;
//     const query = "DELETE FROM customer_groups WHERE id = ?";
//     connection.query(query, [id], (err, result) => {
//         if(err) res.send("خطا در حذف گروه: " + err.message);
//         else res.send("گروه با موفقیت حذف شد");
//     });
// };

// exports.showGroups = (req, res) => {
//     const query = "SELECT * FROM customer_groups";

//     connection.query(query, (err, groups) => {
//         if(err) {
//             res.send("خطا در دریافت گروه‌ها: " + err.message);
//         } else {
//             res.render('groups/index', { groups }); 
//         }
//     });
// };

// عملیات CRUD برای Customer Groups





const connection = require('../config/db');

// افزودن گروه جدید
exports.addGroup = (req, res) => {
    const { group_name } = req.body; //گرفتن داده از فرم 
    if (!group_name || typeof group_name !== "string") //اعتبارسنجی اولیه
        return res.status(400).send("نام گروه معتبر نیست");

    const query = "INSERT INTO customer_groups (group_name) VALUES (?)";  //کویری امن 
    connection.query(query, [group_name], (err, result) => {
        if (err) {
            console.error(err); // log در سرور
            return res.status(500).send("خطا در سرور");
        }
        res.send("گروه با موفقیت اضافه شد");
    });
};

// گرفتن همه گروه‌ها
exports.getAllGroups = (req, res) => {
    const query = "SELECT id, group_name FROM customer_groups";
    connection.query(query, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "خطا در سرور" });
        }
        res.json(result);
    });
};

// ویرایش گروه
exports.updateGroup = (req, res) => {
    const { id, group_name } = req.body; //گرفتن داده 
    if (!id || isNaN(id) || !group_name) //اعتبارسنجی 
        return res.status(400).send("ورودی نامعتبر است");

    const query = "UPDATE customer_groups SET group_name = ? WHERE id = ?";
    connection.query(query, [group_name, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("خطا در سرور");
        }
        res.send("گروه با موفقیت ویرایش شد");
    });
};

// حذف گروه
exports.deleteGroup = (req, res) => {
    const { id } = req.body;  //گرفتن ID
    if (!id || isNaN(id)) return res.status(400).send("ID نامعتبر است");

    const query = "DELETE FROM customer_groups WHERE id = ?";
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("خطا در سرور");
        }
        res.send("گروه با موفقیت حذف شد");
    });
};

// نمایش گروه‌ها در صفحه
exports.showGroups = (req, res) => {  //این یکی برای رندر صفحه هست نه API.
    const query = "SELECT id, group_name FROM customer_groups";
    connection.query(query, (err, groups) => {
        if (err) {
            console.error(err);
            return res.status(500).send("خطا در سرور");
        }
        res.render('groups/index', { groups });
    });
};

//نکات مهم 
//ساختار MVC رو رعایت کرده
// از prepared statements استفاده کرده
// مدیریت خطا داره
// هم API داره هم View
// خوانا و مرتب نوشته شده