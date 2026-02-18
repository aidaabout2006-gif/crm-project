// const connection = require('../config/db');
// const bcrypt = require('bcrypt'); 
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = "my_secret_key";  

// // ثبت نام
// exports.registerUser = (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     const email = req.body.email;

//     bcrypt.hash(password, 10, (err, hashedPassword) => { // رمز هش می‌شود
//         if (err) return res.send("خطا در پردازش رمز");

//         const query = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)";
//         connection.query(query, [username, hashedPassword, email], (err, results) => {
//             if (err) return res.send("خطا در سرور");

//             if (results.length > 0) {
//                 res.redirect('/register');
//             } else {
//                 res.redirect('/dashboard');
//             }
//         });
//     });
// };

// // لاگین
// exports.loginUser = (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     const query = "SELECT * FROM users WHERE username = ?";
//     connection.query(query, [username], (err, results) => {
//         if (err) return res.send("خطا در سرور");

//         if (results.length === 0) return res.send("نام کاربری یا رمز عبور اشتباه است");

        
//         bcrypt.compare(password, results[0].password, (err, match) => {
//             if (err) return res.send("خطا در پردازش رمز");
//             if (!match) return res.send("نام کاربری یا رمز عبور اشتباه است");

           
//             const token = jwt.sign(
//                 { id: results[0].id, username: results[0].username },
//                 SECRET_KEY,
//                 { expiresIn: "1h" }
//             );

//             // ذخیره توکن در کوکی 
//             res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

//             // بعد از لاگین، کاربر به داشبورد برود
//             res.redirect('/dashboard');
         
//         });
//     });
// };

// // فراموشی رمز عبور
// exports.forgetPassword = (req , res) => {
//     const { email, newPassword } = req.body;

//     const checkUserQuery = "SELECT * FROM users WHERE email = ?";
//     connection.query(checkUserQuery, [email], (err, result) => {
//         if (err) return res.status(500).send("خطای سرور");
//         if (result.length === 0) return res.status(404).send("کاربری با این ایمیل پیدا نشد");

//         // هش کردن رمز جدید
//         bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
//             if (err) return res.status(500).send("خطا در پردازش رمز");

//             const updateQuery = "UPDATE users SET password = ? WHERE email = ?";
//             connection.query(updateQuery, [hashedPassword, email], (err, result) => {
//                 if (err) return res.status(500).send("خطا در تغییر رمز");
//                 res.redirect("/users/login");
//             });
//         });
//     });
// };
//-------------------------------------------------------------------------------------------------------------------

//سه ابزار مهم استفاده کردیم
//هش کردن رمز با bcrypt
//ساخت توکن با jsonwebtoken
//د احراز هویت JSON Web Token
const connection = require('../config/db');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || "my_secret_key";

// ثبت نام
exports.registerUser = (req, res) => {
    const { username, password, email } = req.body;

    // Validation ساده
    if (!username || !password || !email) 
        return res.status(400).send("لطفاً همه فیلدها را پر کنید");

    bcrypt.hash(password, 10, (err, hashedPassword) => {  //هش کردن رمز عبور 
        if (err) {
            console.error(err);
            return res.status(500).send("خطا در پردازش رمز");
        }

        const query = "INSERT INTO users (username, password, email) VALUES (?, ?, ?)"; //ذخیره در دیتابیس 
        connection.query(query, [username, hashedPassword, email], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send("خطا در سرور");
            }
            res.redirect('/dashboard');
        });
    });
};

// لاگین
exports.loginUser = (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) 
        return res.status(400).send("لطفاً نام کاربری و رمز عبور را وارد کنید");

    const query = "SELECT * FROM users WHERE username = ?";
    connection.query(query, [username], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("خطا در سرور");
        }

        if (results.length === 0) return res.send("نام کاربری یا رمز عبور اشتباه است");

        bcrypt.compare(password, results[0].password, (err, match) => {  //مقایسه رمز /bcrypt خودش هش رو بررسی می‌کنه./اگر match نبود → خطا.
            if (err) {
                console.error(err);
                return res.status(500).send("خطا در پردازش رمز");
            }
            if (!match) return res.send("نام کاربری یا رمز عبور اشتباه است");
                

            //ساخت  JWT
            //توکن شامل:
            //id
            //username
            //اعتبار 1 ساعته
            const token = jwt.sign(
                { id: results[0].id, username: results[0].username },
                SECRET_KEY,
                { expiresIn: "1h" }
            );

            // ذخیره توکن در کوکی امن
            res.cookie('token', token, { 
                httpOnly: true, //جاوااسکریپت سمت کلاینت به کوکی دسترسی ندارد (ضد XSS)
                maxAge: 3600000,  //مدت اعتبار کوکی 
                secure: true,  //فقط روی Https ارسال میشه 
                sameSite: 'strict' });  //جلوگیری از CSRF

            res.redirect('/dashboard');
        });
    });
};

// فراموشی رمز عبور
//مراحل:
// بررسی وجود ایمیل
// هش کردن رمز جدید
// آپدیت در دیتابیس
exports.forgetPassword = (req, res) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) 
        return res.status(400).send("لطفاً ایمیل و رمز جدید را وارد کنید");

    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(checkUserQuery, [email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("خطا در سرور");
        }
        if (result.length === 0) return res.status(404).send("کاربری با این ایمیل پیدا نشد");

        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if (err) {
                console.error(err);
                return res.status(500).send("خطا در پردازش رمز");
            }

            const updateQuery = "UPDATE users SET password = ? WHERE email = ?";
            connection.query(updateQuery, [hashedPassword, email], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("خطا در تغییر رمز");
                }
                res.redirect("/users/login");
            });
        });
    });
};


 //تحلیل 
// رمز هش می‌شود
// SQL Injection نداری
// JWT داری
// کوکی httpOnly داری
// expiration برای توکن گذاشتی

//جمع‌بندی
//  الان یک سیستم احراز هویت کامل داریم که شامل:
//ثبت‌نام
//لاگین
//هش رمز
//JWT
//کوکی امن
//ریست پسورد