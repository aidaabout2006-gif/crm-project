const connection = require('../config/db');
const bcrypt = require('bcrypt'); 

// ثبت نام
exports.registerUser = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    bcrypt.hash(password, 10, (err, hashedPassword) => { // رمز هش می‌شود
        if (err) return res.send("خطا در پردازش رمز");

        const query = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
        connection.query(query, [username, hashedPassword, email], (err, results) => {
            if (err) return res.send("خطا در سرور");

            if (results.length > 0) {
                res.redirect('/register');
            } else {
                res.send("کاربر با موفقیت ثبت نام کرد");
            }
        });
    });
};

// لاگین
exports.loginUser = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = "SELECT * FROM users WHERE username = ?";
    connection.query(query, [username], (err, results) => {
        if (err) return res.send("خطا در سرور");

        if (results.length === 0) return res.send("نام کاربری یا رمز عبور اشتباه است");

        
        bcrypt.compare(password, results[0].password, (err, match) => {
            if (err) return res.send("خطا در پردازش رمز");
            if (!match) return res.send("نام کاربری یا رمز عبور اشتباه است");

            // session می‌سازیم
            req.session.user = { id: results[0].id, username: results[0].username };
            res.redirect('/dashboard');
        });
    });
};

// فراموشی رمز عبور
exports.forgetPassword = (req , res) => {
    const { email, newPassword } = req.body;

    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(checkUserQuery, [email], (err, result) => {
        if (err) return res.status(500).send("خطای سرور");
        if (result.length === 0) return res.status(404).send("کاربری با این ایمیل پیدا نشد");

        // هش کردن رمز جدید
        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if (err) return res.status(500).send("خطا در پردازش رمز");

            const updateQuery = "UPDATE users SET password = ? WHERE email = ?";
            connection.query(updateQuery, [hashedPassword, email], (err, result) => {
                if (err) return res.status(500).send("خطا در تغییر رمز");
                res.redirect("/users/login");
            });
        });
    });
};
