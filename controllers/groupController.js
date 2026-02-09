const connection = require('../config/db');

exports.addGroup = async(req, res) => {
    const { group_name } = req.body;
    const query = "INSERT INTO customer_groups (group_name) VALUES (?)"; // درست شد
    connection.query(query, [group_name], (err, result) => {
        if (err) res.send("خطا در اضافه کردن گروه: " + err.message);
        else res.send("گروه با موفقیت اضافه شد");
    });
};

exports.getAllGroups = (req, res) => {
    const query = "SELECT * FROM customer_groups";

    connection.query(query, (err, results) => {
        if(err) res.send("خطا در دریافت گروه‌ها: " + err.message);
        else res.json(results);
    });
};

exports.updateGroup = (req, res) => {
    const { id, group_name } = req.body;
    const query = "UPDATE customer_groups SET group_name = ? WHERE id = ?";
    connection.query(query, [group_name, id], (err, result) => {
        if(err) res.send("خطا در ویرایش گروه: " + err.message);
        else res.send("گروه با موفقیت ویرایش شد");
    });
};

exports.deleteGroup = (req, res) => {
    const { id } = req.body;
    const query = "DELETE FROM customer_groups WHERE id = ?";
    connection.query(query, [id], (err, result) => {
        if(err) res.send("خطا در حذف گروه: " + err.message);
        else res.send("گروه با موفقیت حذف شد");
    });
};
exports.showGroups = (req, res) => {
    const query = "SELECT * FROM customer_groups";

    connection.query(query, (err, groups) => {
        if(err) {
            res.send("خطا در دریافت گروه‌ها: " + err.message);
        } else {
            res.render('groups/index', { groups }); // رندر صفحه و پاس دادن گروه‌ها
        }
    });
};
